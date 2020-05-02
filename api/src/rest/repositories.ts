import {Router, Request, Response, NextFunction} from 'express';

import { createRequest } from "../createRequest";
import {logger} from '../logger';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.q;
    logger.info(`searching for ${search}`);
    const data = await createRequest(`/search/repositories?q=${search}`);
    res.json(data);
  } catch(err) {
    next(err);
  }
});

export default router;
