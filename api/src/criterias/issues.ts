import { createRequest } from "../createRequest";
import { Channels, Message, Category } from "../types";
import { publish, registerCallback, unregisterCallback } from "../pubsub";

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

function* issuesComments(ownerName: string, repoName: string, issues: any) {
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    yield createRequest(
      `/repos/${ownerName}/${repoName}/issues/${issue.number}/comments`
    );
  }
}

async function fetchData(repository: any) {
  const repoName = repository.name;
  const ownerName = repository.owner.login;
  const openIssues = await createRequest(
    `/search/issues?q=+state:open+type:issue+repo:${ownerName}/${repoName}`
  );
  const issuesList: Issue[] = [];

  let issueIndex = 0;
  const iterator = issuesComments(ownerName, repoName, openIssues.items);
  let current = iterator.next();
  while (!current.done) {
    const commentsList = await current.value;
    const { id, number, title, comments } = openIssues.items[issueIndex++];
    const issue: Issue = {
      id,
      number,
      title,
      comments,
      commentsList: commentsList.map((c: any) => ({
        id: c.id,
        authorAssociation: c.author_association,
      })),
    };
    issuesList.push(issue);
    current = iterator.next();
  }

  return issuesList;
}

async function sendData(uniqueId: string, issuesList: Issue[]) {
  return new Promise(async (resolve, reject) => {
    await publish(Channels.ISSUES, {
      Id: uniqueId,
      Payload: {
        Issues: issuesList,
      },
      Mode: Category.RAW_DATA,
    });
    registerCallback(uniqueId, Channels.ISSUES, async (data: Message) => {
      resolve(data.Payload);
    });
  });
}

async function calculate(uniqueId: string, issuesList: Issue[]) {
  const processedData: any = await sendData(uniqueId, issuesList);
  unregisterCallback(uniqueId, Channels.ISSUES);
  return processedData;
}

export { fetchData, calculate };
