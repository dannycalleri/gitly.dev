import fetch from 'node-fetch';

const BASE_URL = "https://api.github.com";

export function createRequest(url: string) {
  return (fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  }).then(response => response.json()));
}
