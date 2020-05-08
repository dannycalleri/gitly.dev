import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { useInterval } from "./useInterval";
import * as API from "../api";
import Results from "./results";

const Log = styled.div`
  font-family: "Source Code Pro", monospace;
  border-radius: 5px;
  background-color: black;
  color: #fff;
  padding: 20px;
  overflow-wrap: ${(props) => (props.isLoading ? "break-word" : "normal")};
  margin-bottom: 25px;
`;

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

  useEffect(() => {
    (async () => {
      if (repository !== undefined) {
        setDelay(300);
        console.log(repository);
        const data = await API.analyze(repository.id, repository.full_name);
        setDelay(null);
        setResults(data);
      }
    })();
  }, [repository]);

  useInterval(() => {
    const str = loadingString + ".";
    setLoadingString(str);
  }, delay);

  if (repository === undefined) {
    return null;
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
          <Log isLoading={isLoading}>
            <Results data={results} />
          </Log>
          <Button onClick={() => reset()}>Reset</Button>
        </>
      )}
    </>
  );
}
