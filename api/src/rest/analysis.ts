import {Router, Request, Response, NextFunction} from 'express';
import { v4 as uuidv4 } from 'uuid';

import { createRequest } from "../createRequest";
import * as stars from '../criterias/stars';
import * as pullRequests from '../criterias/pullRequests';
import * as issues from '../criterias/issues';
import * as documentation from '../criterias/documentation';
import * as commits from '../criterias/commits';
import {logger} from '../logger';
import { RestError } from '../errors';
import { Repository } from '../types';
import {withTimeout} from '../promiseWithTimeout';

const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repositoryId = req.params.id;
    const searchQuery = req.query.q;
    const requestId = uuidv4();

    const data = await withTimeout<any>(() => createRequest(`/search/repositories?q=${searchQuery}`));
    const selectedRepository = data.items.find((repo: Repository) => (
      repo.id === parseInt(repositoryId)
    ));
    if (!selectedRepository) {
      throw new RestError(404, "Repository not found");
    }
    const starsRating = await withTimeout<any>(() => stars.calculate(requestId, selectedRepository));
    logger.info(`stars rating = ${starsRating}`);

    logger.info(`repository name = ${selectedRepository.full_name}`);
    const prData = await withTimeout<any>(() => pullRequests.fetchData(selectedRepository));
    const prRating = await withTimeout<any>(() => pullRequests.calculate(requestId, prData));
    logger.info(`pull requests rating = ${prRating}`);

    const issuesData = await withTimeout<any>(() => issues.fetchData(selectedRepository));
    const issuesRating = await withTimeout<any>(() => issues.calculate(requestId, issuesData));
    logger.info(`open issues rating = ${issuesRating}`);

    // this shouldn't be used
    const documentationData = await withTimeout<any>(() => documentation.fetchData(selectedRepository));
    const documentationRating = await withTimeout<number>(() => documentation.calculate(documentationData));
    logger.info(`documentation rating  = ${documentationRating}`);

    let commitsRating = 0;
    try {
      const commitsData = await withTimeout<any>(() => commits.fetchData(selectedRepository));
      commitsRating = await withTimeout<any>(() => commits.calculate(commitsData));
    } catch(err) {
      console.error('not able to calculate commits rating');
    }
    
    logger.info(`commits rating = ${commitsRating}`);

    const weights = {
      stars: 0.1,
      pullRequests: 0.2,
      issues: 0.3,
      commits: 0.2,
      documentation: 0.2,
    };

    const score = weights.stars * starsRating +
      weights.pullRequests * prRating +
      weights.issues * issuesRating +
      weights.commits * commitsRating +
      weights.documentation * documentationRating;
    logger.info(`final score = ${score}`);
    res.json({
      score,
      starsRating,
      prRating,
      issuesRating,
      commitsRating,
      documentationRating,
    });
  } catch(err) {
    next(err);
  }
});

export default router;
