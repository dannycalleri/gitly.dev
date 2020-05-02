export enum Channels {
  STARS = "stars",
  PULL_REQUESTS = "pull_requests",
  COMMITS = "commits",
  DOCUMENTATION = "documentation",
  ISSUES = "issues",
}

export enum Category {
  RAW_DATA = "raw_data",
  COMPLETE_DATA = "complete_data",
}

export interface Message {
  Id: string;
  Payload: any;
  Mode: Category;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
}