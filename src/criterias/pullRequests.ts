import { createRequest } from "../createRequest";

async function fetchData(repository: any) {
  const repoName = repository.name;
  const ownerName = repository.owner.login;
  const openPullRequests = await createRequest(`/search/issues?q=+state:open+type:pr+repo:${ownerName}/${repoName}`);
  const closedPullRequests = await createRequest(`/search/issues?q=+state:closed+type:pr+repo:${ownerName}/${repoName}`);
  return {
    open: openPullRequests,
    closed: closedPullRequests,
  };
}

function calculate(data: any) {
  const open = data.open.total_count;
  const closed = data.closed.total_count;
  const total = open + closed;
  if(total === 0) {
    return 0;
  }

  return closed / total;
}

export {
  fetchData,
  calculate,
};
