import Cookies from 'js-cookie';

const TokenKey = 'vue_admin_template_token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getPath() {
  const path = IPCONFIG.slice(IPCONFIG.lastIndexOf('/'));
  if (path.indexOf(':') == -1 && path.indexOf('.') == -1) {
    return path;
  } else {
    return '';
  }
}
