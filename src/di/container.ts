import { makeGetAlphabet } from '../application/usecases/getAlphabet';
import { makeGetCategories } from '../application/usecases/getCategories';
import { makeGetProducts } from '../application/usecases/getProducts';
import { makeLogin } from '../application/usecases/login';
import { makeRegister } from '../application/usecases/register';
import { HttpClient } from '../infrastructure/http/HttpClient';
import { ApiAlphabetRepository } from '../infrastructure/repositories/ApiAlphabetRepository';
import { ApiAuthRepository } from '../infrastructure/repositories/ApiAuthRepository';
import { ApiCatalogRepository } from '../infrastructure/repositories/ApiCatalogRepository';
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

  return {
    tokenStorage,
    login: makeLogin(authRepository),
    register: makeRegister(authRepository),
    getAlphabet: makeGetAlphabet(alphabetRepository),
    getCategories: makeGetCategories(catalogRepository),
    getProducts: makeGetProducts(catalogRepository),
  };
}

export const container = createContainer();
