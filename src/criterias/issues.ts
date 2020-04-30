import { createRequest } from "../createRequest";

function *issuesComments(ownerName: string, repoName: string, issues: any) {
  for(let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    yield createRequest(`/repos/${ownerName}/${repoName}/issues/${issue.number}/comments`);
  }
}

async function fetchData(repository: any) {
  const repoName = repository.name;
  const ownerName = repository.owner.login;
  const openIssues = await createRequest(`/search/issues?q=+state:open+type:issue+repo:${ownerName}/${repoName}`);
  const commentsList = [];

  const iterator = issuesComments(ownerName, repoName, openIssues.items);
  let current = iterator.next();
  while (!current.done) {
    const comments = await current.value;
    commentsList.push(comments);
    current = iterator.next();
  }

  return {
    openIssues,
    commentsList,
  };
}

function calculate({ openIssues, commentsList }: {openIssues: any, commentsList: any}) {
  if (openIssues.items.length === 0) {
    return 0;
  }

  let answeredByTeam = 0;
  commentsList.forEach((comments: any) => {
    const anyAnswerByTeam = comments.filter((comment: any) => (
      comment.author_association === 'COLLABORATOR' ||
      comment.author_association === 'CONTRIBUTOR' ||
      comment.author_association === 'MEMBER' ||
      comment.author_association === 'OWNER'
    )).length > 0;

    if(anyAnswerByTeam) {
      answeredByTeam++;
    }
  });

  return answeredByTeam / openIssues.items.length;
}

export {
  fetchData,
  calculate,
};