import Redis from "ioredis";

const host = process.env.APP_ENV === "prod" ? "redis" : "localhost";
const redis = new Redis(6379, host);
export default redis;
