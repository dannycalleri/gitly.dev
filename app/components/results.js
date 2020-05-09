import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBook,
  faExclamationTriangle,
  faCodeBranch,
  faBurn,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const ScoreList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    line-height: 2em;
    display: flex;
    align-items: center;

    .label {
      flex: 1;
    }

    .score {
      flex: 2;
    }
  }
`;

export default function Results(props) {
  const { data } = props;
  const { score, ...otherScores } = data;
  const configurationByScoreName = {
    starsRating: {
      icon: faStar,
      label: "Stars",
    },
    prRating: {
      icon: faCodeBranch,
      label: "Pull Requests",
    },
    issuesRating: {
      icon: faExclamationTriangle,
      label: "Issues",
    },
    commitsRating: {
      icon: faArrowRight,
      label: "Commits",
    },
    documentationRating: {
      icon: faBook,
      label: "Documentation",
    },
  };
  const pairs = Object.entries(otherScores);
  const iconFactory = (width, icon) => (
    <FontAwesomeIcon
      icon={icon}
      width={width}
      style={{ marginRight: "15px" }}
    />
  );
  return (
    <>
      <ScoreList>
        {pairs.map((pair, index) => {
          const conf = configurationByScoreName[pair[0]];
          return (
            <li key={`${pair[0]}${index}`}>
              <span className="label">
                {iconFactory(16, conf.icon)}
                {conf.label}:
              </span>
              <span className="score">{pair[1]}</span>
            </li>
          );
        })}
        <li style={{ fontWeight: "bold", fontSize: "2em" }}>
          <span className="label">{iconFactory(16, faBurn)}Score:</span>
          <span className="score">{score}</span>
        </li>
      </ScoreList>
    </>
  );
}
