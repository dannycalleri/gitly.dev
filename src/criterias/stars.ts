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

async function fetchData(repository: any) {
  return await createRequest(`/search/repositories?q=${repository}`);
}

function sendData(data: any) {
  const selected = data.items[0];
  const stars = selected.stargazers_count;
  return new Promise(async (resolve, reject) => {
    await publish(Channels.STARS, {
      Id: '1337',
      Payload: {
        stars
      },
      Mode: Category.RAW_DATA,
    });
    registerCallback('1337', Channels.STARS, async (data: Message) => {
      resolve(data.Payload);
    });
  });
}

async function calculate(data: any) {
  const processedData: any = await sendData(data);
  unregisterCallback('1337', Channels.STARS);
  return processedData.Stars;
}

export {
  fetchData,
  calculate,
};
