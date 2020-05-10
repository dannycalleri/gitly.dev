import fetch from "isomorphic-unfetch";

const baseUrl = "http://localhost:8080";

function createRequest(url) {
  return fetch(`${baseUrl}${url}`);
}

export async function getAnalysis(id) {
  const request = await createRequest(`/scores/${id}`);

  if (request.status === 200) {
    return await request.json();
  }

  const error = await request.json();
  throw error;
}

export async function analyze(id, query) {
  const queryString = encodeURIComponent(query);
  const request = await createRequest(`/analysis/${id}?q=${queryString}`);

  if (request.status === 200) {
    return await request.json();
  }

  const error = await request.json();
  throw error;
}

export async function search(query) {
  const queryString = encodeURIComponent(query);
  const request = await createRequest(`/repositories?q=${queryString}`);

  if (request.status === 200) {
    return await request.json();
  }

  const error = await request.json();
  throw error;
}
