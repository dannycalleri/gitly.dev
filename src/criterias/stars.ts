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

function sendData(uniqueId: string, data: any) {
  const selected = data.items[0];
  const stars = selected.stargazers_count;
  return new Promise(async (resolve, reject) => {
    await publish(Channels.STARS, {
      Id: uniqueId,
      Payload: {
        stars
      },
      Mode: Category.RAW_DATA,
    });
    registerCallback(uniqueId, Channels.STARS, async (data: Message) => {
      resolve(data.Payload);
    });
  });
}

async function calculate(uniqueId: string, data: any) {
  const processedData: any = await sendData(uniqueId, data);
  unregisterCallback(uniqueId, Channels.STARS);
  return processedData.Stars;
}

export {
  fetchData,
  calculate,
};
