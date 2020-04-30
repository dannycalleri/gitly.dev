import fetch from 'node-fetch';

export function createRequest(url: string) {
  return (fetch(`${process.env.BASE_URL}${url}`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  }).then(response => response.json()));
}
