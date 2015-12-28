import cookie from 'react-cookie';

export function isConnected(flux) {
  return function ({ location: { pathname } }, replaceState) {
    const { _user } = flux.getStore('login').getState();
    if (!_user) return replaceState(null, `/login?redirect=${pathname}`);
  };
}
