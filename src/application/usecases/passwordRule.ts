/** Mirrors the dlearning-api rule: 8-128 chars, at least one letter and one digit. */
export function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    password.length <= 128 &&
    /\p{L}/u.test(password) &&
    /\p{N}/u.test(password)
  );
}

/** Mirrors the dlearning-api rule: 3-50 chars of letters, digits, '.', '_' and '-'. */
export function isValidUsername(username: string): boolean {
  return /^[A-Za-z0-9._-]{3,50}$/.test(username);
}
