import fetch from "isomorphic-unfetch";

const baseUrl = "http://localhost:8080";

function createRequest(url) {
  return fetch(`${baseUrl}${url}`);
}

export async function getAnalysis(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`fetching analysis for id ${id}`);
      resolve({
        score: 1,
        starsRating: 0.5,
        prRating: 0.3,
        issuesRating: 0.2,
        commitsRating: 0.5,
        documentationRating: 0.2,
      });
    }, 1000);
  });
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
