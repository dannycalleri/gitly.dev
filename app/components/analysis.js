import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { useInterval } from "./useInterval";
import * as API from "../api";
import Results from "./results";
import Whaaat from "./whaaat";
import { Log } from "./log";
import { analysisParagraph } from "./paragraphs";
import * as Tracking from "./tracking";

const Button = styled.button`
  cursor: pointer;
  padding: 2vw 7vw;
  border: 1px solid black;
  background-color: transparent;
  outline: none;
  box-shadow: 4px 4px 0 #222;

  &:hover {
    position: relative;
    top: 2px;
    left: 2px;
    box-shadow: 2px 2px 0 #222;
  }
`;

export default function Analysis(props) {
  const { repository, reset } = props;
  const [loadingString, setLoadingString] = useState("");
  const [delay, setDelay] = useState(null);
  const [results, setResults] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      if (repository !== undefined) {
        setDelay(300);
        console.log(repository);

        let data = undefined;
        try {
          data = await API.analyze(repository.id, repository.full_name);
          setResults(data);
          window.history.pushState(
            {},
            `Score for ${repository.full_name}`,
            `/score/${encodeURIComponent(repository.id)}`
          );
          Tracking.recordPageView();
        } catch (err) {
          console.error(err);
        } finally {
          setDelay(null);
        }

        if (!data) {
          setError(true);
        }
      }
    })();
  }, [repository]);

  useInterval(() => {
    const str = loadingString + ".";
    setLoadingString(str);
  }, delay);

  function handleReset() {
    setError(false);
    reset();
  }

  if (repository === undefined) {
    return null;
  }

  if (error) {
    return (
      <>
        <h1>{repository.full_name}</h1>
        <div>
          <p>This repository doesn't have enough data to analyze :(</p>
          <p>Please try with another one.</p>
        </div>
        <Button onClick={() => handleReset()}>Reset</Button>
      </>
    );
  }

  const isLoading = delay !== null;
  return (
    <>
      <h1>{repository.full_name}</h1>
      {isLoading ? (
        <Log isLoading={isLoading}>
          <>We're crunching data {loadingString}</>
        </Log>
      ) : (
        <>
          <Whaaat
            label="Whaaat?"
            title="How it works"
            paragraph={analysisParagraph}
          />
          <Log isLoading={isLoading}>
            <Results data={results} />
          </Log>
          <Button onClick={() => reset()}>Reset</Button>
        </>
      )}
    </>
  );
}
