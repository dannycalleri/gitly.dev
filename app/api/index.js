import fetch from 'isomorphic-unfetch';

export function createRequest (url) {
  return fetch(url);
};
