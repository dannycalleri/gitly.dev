import {
  Channels,
  Message,
  Category,
  Repository,
} from '../types';
import {
  publish,
  registerCallback,
  unregisterCallback,
} from '../redis';
import { logger } from "../logger";

function sendData(uniqueId: string, selected: Repository) {
  logger.info(selected.name);
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
  calculate,
};
