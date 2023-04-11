export const createCookie =  (key, value) => {
  const expiredTime = (new Date(Date.now() + 24 * 60 * 60 *1000)).toUTCString();

  document.cookie = `${key}=${value};expires=${expiredTime};path=/`;

  return document.cookie;
};
