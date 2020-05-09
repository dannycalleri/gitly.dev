import fetch from "isomorphic-unfetch";

function createRequest(url) {
  return fetch(url);
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(id, query);
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

export async function search(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(query);
      resolve([
        {
          id: 10270250,
          name: "react",
          full_name: "facebook/react",
          stargazers_count: 147905,
        },
        {
          id: 10270251,
          name: "react",
          full_name: "facebook/react",
          stargazers_count: 147905,
        },
        {
          id: 10270252,
          name: "react",
          full_name: "facebook/react",
          stargazers_count: 147905,
        },
      ]);
    }, 1000);
  });
}
