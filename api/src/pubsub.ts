import Redis from "ioredis";
import { logger } from "./logger";
import { Channels, Message, Category } from "./types";

const host = process.env.APP_ENV === "prod" ? "redis" : "localhost";
const redis = new Redis(6379, host);
const pub = new Redis(6379, host);

let initialized = false;
const messageCallbacks: Map<string, Function> = new Map();

redis.on("message", function (channel, message) {
  logger.info("Receive message from channel %s", channel);
  logger.info(message);
  const parsedMessage: Message = JSON.parse(message);
  const id: string = parsedMessage.Id;
  const mode: Category = parsedMessage.Mode;
  const key = buildCallbackKey(id, channel);
  const callback: Function = messageCallbacks.get(key);
  if (callback !== undefined) {
    callback(parsedMessage);
  } else {
    logger.warn(
      "No callback set for channel %s with id=%s mode=%s",
      channel,
      id,
      mode
    );
  }
});

async function init() {
  if (initialized) {
    return;
  }

  initialized = true;
  await subscribe(Channels.STARS);
  await subscribe(Channels.PULL_REQUESTS);
  await subscribe(Channels.COMMITS);
  await subscribe(Channels.DOCUMENTATION);
  await subscribe(Channels.ISSUES);
}

function unsubscribe(channel: Channels) {
  return redis.unsubscribe(`${channel}:${Category.COMPLETE_DATA}`);
}

function subscribe(channel: Channels) {
  return redis.subscribe(`${channel}:${Category.COMPLETE_DATA}`);
}

function buildCallbackKey(id: string, channel: Channels) {
  if (channel.toString().indexOf(":") >= 0) {
    return `${id}:${channel}`;
  }
  return `${id}:${channel}:${Category.COMPLETE_DATA}`;
}

function unregisterCallback(id: string, channel: Channels) {
  messageCallbacks.delete(buildCallbackKey(id, channel));
}

function registerCallback(id: string, channel: Channels, callback: Function) {
  messageCallbacks.set(buildCallbackKey(id, channel), callback);
}

async function publish(channel: Channels, message: Message) {
  pub.publish(`${channel}:${Category.RAW_DATA}`, JSON.stringify(message));
}

async function cleanup() {
  await unsubscribe(Channels.STARS);
  await unsubscribe(Channels.PULL_REQUESTS);
  await unsubscribe(Channels.COMMITS);
  await unsubscribe(Channels.DOCUMENTATION);
  await unsubscribe(Channels.ISSUES);
  messageCallbacks.clear();
}

export { init, cleanup, publish, registerCallback, unregisterCallback };
