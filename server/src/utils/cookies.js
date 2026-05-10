const env = require('../config/env');

function setAuthCookies(res, accessToken, refreshToken) {
  const baseCookie = {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: 'lax'
  };

  res.cookie('accessToken', accessToken, {
    ...baseCookie,
    maxAge: 15 * 60 * 1000
  });

  res.cookie('refreshToken', refreshToken, {
    ...baseCookie,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

function clearAuthCookies(res) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
}

module.exports = {
  setAuthCookies,
  clearAuthCookies
};
