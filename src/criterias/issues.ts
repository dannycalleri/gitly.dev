import { createRequest } from "../createRequest";

interface Comment {
  id: number;
  authorAssociation: string;
}

interface Issue {
  id: number;
  number: number;
  title: string;
  comments: number;
  commentsList: Comment[];
}

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
  const issuesList: Issue[] = [];
  
  let issueIndex = 0;
  const iterator = issuesComments(ownerName, repoName, openIssues.items);
  let current = iterator.next();
  while (!current.done) {
    const commentsList = await current.value;
    const {id, number, title, comments} = openIssues.items[issueIndex++];
    const issue: Issue = {
      id,
      number,
      title,
      comments,
      commentsList,
    };
    issuesList.push(issue);
    current = iterator.next();
  }

  return issuesList;
}

function calculate(issuesList: Issue[]) {
  if (issuesList.length === 0) {
    return 0;
  }

  let answeredByTeam = 0;
  issuesList.forEach((issue: Issue) => {
    const comments = issue.commentsList;
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

  return answeredByTeam / issuesList.length;
}

export {
  fetchData,
  calculate,
};