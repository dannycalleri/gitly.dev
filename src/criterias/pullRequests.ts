import { createRequest } from "../createRequest";
import {
  Channels,
  Message,
  Category,
} from '../types';
import {
  publish,
  registerCallback,
  unregisterCallback,
} from '../redis';

interface PullRequestsData {
  open: number;
  closed: number;
}

async function fetchData(repository: any): Promise<PullRequestsData> {
  const repoName = repository.name;
  const ownerName = repository.owner.login;
  const openPullRequests = await createRequest(`/search/issues?q=+state:open+type:pr+repo:${ownerName}/${repoName}`);
  const closedPullRequests = await createRequest(`/search/issues?q=+state:closed+type:pr+repo:${ownerName}/${repoName}`);
  return {
    open: openPullRequests.total_count,
    closed: closedPullRequests.total_count,
  };
}

async function sendData({open, closed}: PullRequestsData) {
  return new Promise(async (resolve, reject) => {
    await publish(Channels.PULL_REQUESTS, {
      Id: '1337',
      Payload: {
        OpenCount: open,
        ClosedCount: closed,
      },
      Mode: Category.RAW_DATA,
    });
    registerCallback('1337', Channels.PULL_REQUESTS, async (data: Message) => {
      resolve(data.Payload);
    });
  });
}

async function calculate(data: PullRequestsData) {
  const processedData: any = await sendData(data);
  unregisterCallback('1337', Channels.PULL_REQUESTS);
  return processedData;
}

export {
  fetchData,
  calculate,
};
