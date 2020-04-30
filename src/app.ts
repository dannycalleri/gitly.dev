require('dotenv').config();

import {logger} from './logger';
import * as redis from './redis';
import * as stars from './criterias/stars';
import * as pullRequests from './criterias/pullRequests';
import * as issues from './criterias/issues';
import * as documentation from './criterias/documentation';
import * as commits from './criterias/commits';

(async () => {
  await redis.init();

  // const repository = 'ture+typescript+algorithm';
  const repository = 'react';
  // const repository = 'grommet';
  // const repository = 'semantic-ui';
  // const repository = 'jquery';
  // const repository = 'styled-components';
  // const repository = 'apache+spark';
  // const repository = 'kubernetes';
  // const repository = 'vscode';

  const data = await stars.fetchData(repository);
  const starsRating = await stars.calculate(data);
  logger.info(`stars rating = ${starsRating}`);

  const selectedRepository = data.items[0];

  logger.info(`repository name = ${selectedRepository.full_name}`);
  const prData = await pullRequests.fetchData(selectedRepository);
  const prRating = await pullRequests.calculate(prData);
  logger.info(`pull requests rating = ${prRating}`);

  const issuesData = await issues.fetchData(selectedRepository);
  const issuesRating = await issues.calculate(issuesData);
  logger.info(`open issues rating = ${issuesRating}`);

  // this shouldn't be used
  const documentationData = await documentation.fetchData(selectedRepository);
  const documentationRating = await documentation.calculate(documentationData);
  logger.info(`documentation rating  = ${documentationRating}`);

  let commitsRating = 0;
  try {
    const commitsData = await commits.fetchData(selectedRepository);
    commitsRating = await commits.calculate(commitsData);
  } catch(err) {
    console.error('not able to calculate commits rating');
  }
  
  logger.info(`commits rating = ${commitsRating}`);

  await redis.cleanup();

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
})();
