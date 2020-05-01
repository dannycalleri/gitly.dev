import fetch from 'node-fetch';
import { createRequest } from "../createRequest";

async function fetchData(repository: any) {
  const repoName = repository.name;
  const ownerName = repository.owner.login;
  const pagesData = await createRequest(`/repos/${ownerName}/${repoName}/pages`);
  const wikiResponse = await fetch(`https://github.com/${ownerName}/${repoName}/wiki`);
  const redirected = wikiResponse.redirected;
  const wikiText = await wikiResponse.text();
  return {
    pages: {
      hasPages: repository.has_pages,
      status: pagesData.status,
    },
    wiki: {
      hasWiki: repository.has_wiki,
      text: wikiText,
    },
    redirected,
  };
}

function calculate({ pages, wiki, redirected }: {pages: any, wiki: any, redirected: boolean}) {
  let score = 0;
  if (pages.hasPages && pages.status !== 'null') {
    score += 0.5;
  }

  if (wiki.hasWiki && !redirected && wiki.text.indexOf('blankslate') < 0) {
    score += 0.5;
  }

  return score;
}

export {
  fetchData,
  calculate,
};
