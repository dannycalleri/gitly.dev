export enum Channels {
  STARS = "stars",
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
