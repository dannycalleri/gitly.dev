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
import * as d3 from "d3-format";

const ScoreList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 10px;
    display: flex;
    align-items: center;

    .label {
      flex: 1;

      .text,
      .icon svg {
        vertical-align: middle;
      }
    }

    .score {
      flex: 0;
    }

    &:nth-child(odd) {
      background-color: white;
      color: black;
    }
  }

  @media (max-width: 500px) {
    font-size: 0.75em;
  }
`;

export default function Results(props) {
  const { data } = props;
  const { score, name, ...otherScores } = data;
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
                <span className="icon">{iconFactory(16, conf.icon)}</span>
                <span className="text">{conf.label}:</span>
              </span>
              <span className="score">{d3.format(".2%")(pair[1])}</span>
            </li>
          );
        })}
        <li style={{ fontWeight: "bold", fontSize: "2em" }}>
          <span className="label">
            <span className="icon">{iconFactory(16, faBurn)}</span>
            <span className="text">Score:</span>
          </span>
          <span className="score">{d3.format(".2%")(score)}</span>
        </li>
      </ScoreList>
    </>
  );
}
