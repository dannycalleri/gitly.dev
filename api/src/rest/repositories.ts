import {Router, Request, Response, NextFunction, response} from 'express';

import { createRequest } from "../createRequest";
import {logger} from '../logger';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.q;
    logger.info(`searching for ${search}`);
    const data = await createRequest(`/search/repositories?q=${search}`);
    const items = data.items.map((repo: any) => {
      return {
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        stargazers_count: repo.stargazers_count,
      };
    });
    res.json(items || []);
  } catch(err) {
    next(err);
  }
});

export default router;
