import { makeGetAlphabet } from '../application/usecases/getAlphabet';
import { makeGetAnimals } from '../application/usecases/getAnimals';
import { makeGetCategories } from '../application/usecases/getCategories';
import { makeGetColors } from '../application/usecases/getColors';
import { makeGetCounting } from '../application/usecases/getCounting';
import { makeGetProducts } from '../application/usecases/getProducts';
import { makeLogin } from '../application/usecases/login';
import { makeRegister } from '../application/usecases/register';
import { HttpClient } from '../infrastructure/http/HttpClient';
import { ApiAlphabetRepository } from '../infrastructure/repositories/ApiAlphabetRepository';
import { ApiAnimalRepository } from '../infrastructure/repositories/ApiAnimalRepository';
import { ApiAuthRepository } from '../infrastructure/repositories/ApiAuthRepository';
import { ApiCatalogRepository } from '../infrastructure/repositories/ApiCatalogRepository';
import { ApiColorRepository } from '../infrastructure/repositories/ApiColorRepository';
import { ApiCountingRepository } from '../infrastructure/repositories/ApiCountingRepository';
import { TokenStorage } from '../infrastructure/storage/TokenStorage';

function createContainer() {
  const tokenStorage = new TokenStorage();

  const http = new HttpClient({
    baseUrl: '/api',
    getToken: () => tokenStorage.load()?.token ?? null,
    onUnauthorized: () => {
      tokenStorage.clear();
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    },
  });

  const authRepository = new ApiAuthRepository(http);
  const alphabetRepository = new ApiAlphabetRepository(http);
  const catalogRepository = new ApiCatalogRepository(http);
  const colorRepository = new ApiColorRepository(http);
  const animalRepository = new ApiAnimalRepository(http);
  const countingRepository = new ApiCountingRepository(http);

  return {
    tokenStorage,
    login: makeLogin(authRepository),
    register: makeRegister(authRepository),
    getAlphabet: makeGetAlphabet(alphabetRepository),
    getCategories: makeGetCategories(catalogRepository),
    getProducts: makeGetProducts(catalogRepository),
    getColors: makeGetColors(colorRepository),
    getAnimals: makeGetAnimals(animalRepository),
    getCounting: makeGetCounting(countingRepository),
  };
}

export const container = createContainer();
