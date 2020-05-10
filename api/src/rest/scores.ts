import { Router, Request, Response, NextFunction } from "express";
import redis from "../redis";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const rawData = await redis.get(`score:${id}`);
    const finalScoreData = JSON.parse(rawData);
    res.json(finalScoreData);
  } catch (err) {
    next(err);
  }
});

export default router;
