import moment, { Moment } from 'moment';

import { createRequest } from "../createRequest";

const buildHistogram = (commits: any, days: any) => {
  const allDates = commits.map((data: any) => data.commit.committer.date);
  const sortedDates = allDates.sort((a: Moment, b: Moment) => moment(a).valueOf() - moment(b).valueOf());
  const minimum = moment(sortedDates[0]);
  
  // histogram on the past days
  const pastDaysHistogram: any = {};
  for(let day=0; day < days; day++) {
    const dayFormatted = moment().subtract(day, 'day').format('YYYY-MM-DD');
    if (moment(dayFormatted).valueOf() < minimum.valueOf()) {
      break;
    }

    pastDaysHistogram[dayFormatted] = 0;
  }

  commits.forEach((data: any) => {
    const date = moment(data.commit.committer.date).format('YYYY-MM-DD');
    if(pastDaysHistogram[date] !== undefined) {
      pastDaysHistogram[date]++;
    }
  });

  return pastDaysHistogram;
}

const calculateStandardDeviation = (histogram: number[]) => {
  const entries = Object.keys(histogram).length;
  const sum = Object.values(histogram).reduce((acc, value) => acc + value, 0);
  const average = sum / entries;
  const quadraticDistancesSum = Object.values(histogram)
    .reduce((acc, value) => acc + (value - average) * (value - average), 0);
  const quadraticDifferencesAverage = quadraticDistancesSum / entries;
  return {
    deviation: Math.sqrt(quadraticDifferencesAverage),
    average,
  };
}

async function fetchData(repository: any) {
  const repoName = repository.name;
  const ownerName = repository.owner.login;
  // roughly ~150 commits
  const commits = [
    ...(await createRequest(`/repos/${ownerName}/${repoName}/commits`)),
    ...(await createRequest(`/repos/${ownerName}/${repoName}/commits?page=2`)),
    ...(await createRequest(`/repos/${ownerName}/${repoName}/commits?page=3`)),
    ...(await createRequest(`/repos/${ownerName}/${repoName}/commits?page=4`)),
    ...(await createRequest(`/repos/${ownerName}/${repoName}/commits?page=5`)),
  ];
  return commits;
}

async function calculate(commits: any): Promise<number> {
  const biggerHistogram = buildHistogram(commits, 90);
  const smallerHistogram = buildHistogram(commits, 30);
  const daysWithLessThanOneCommit = Object.values(biggerHistogram).filter(value => value < 1).length;
  const totalDays = Object.keys(biggerHistogram).length;
  const rateLessThanOne = daysWithLessThanOneCommit / totalDays;
  if(rateLessThanOne > 0.90) {
    return 0;
  }

  const {
    deviation, 
    average
  } = calculateStandardDeviation(biggerHistogram);

  const manyCommitPerDay = Object.keys(biggerHistogram).length === Object.keys(smallerHistogram).length;
  if (manyCommitPerDay && average > 10) {
    return 1;
  }

  const numberOfDaysInsideTheStandard = Object.values(smallerHistogram).filter(numberOfCommits => {
    return numberOfCommits >= (average - deviation) && numberOfCommits <= (average + deviation);
  }).length;
  return numberOfDaysInsideTheStandard / Object.keys(smallerHistogram).length;
}

export {
  fetchData,
  calculate,
};
