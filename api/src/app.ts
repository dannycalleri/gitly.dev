require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pino from "pino-http";

import * as pubsub from "./pubsub";
import { logger } from "./logger";
import { RestError, handleError } from "./errors";
import analysis from "./rest/analysis";
import repositories from "./rest/repositories";
import scores from "./rest/scores";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  pino({
    logger,
  })
);
app.use(bodyParser.json());
app.use(cors());

(async () => {
  logger.info("starting redis...");
  await pubsub.init();
  logger.info("redis started!");

  app.use("/analysis", analysis);
  app.use("/repositories", repositories);
  app.use("/scores", scores);
  app.use((err: RestError, req: any, res: any, next: any) => {
    handleError(err, res);
  });

  app.listen(port);
  logger.info(`server now ready to accept connections on ${port}!`);
})();

process.on("exit", async function () {
  await pubsub.cleanup();
});
