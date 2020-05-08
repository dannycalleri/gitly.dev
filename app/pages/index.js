import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

import Search from "../components/search";
import withLayout from "../components/layout";
import { useInterval } from "../components/useInterval";
import * as API from "../api";

const Container = styled.div`
  position: relative;
  transition: ${(props) =>
    props.active
      ? "opacity 0.3s ease-out, top 0.5s ease-in"
      : "opacity 0.6s ease-in, top 1s ease-out"};
  top: ${(props) => (props.active ? "0" : "100px")};
  opacity: ${(props) => (props.active ? "1" : "0")};
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  user-select: ${(props) => (props.active ? "auto" : "none")};
`;

const Heading = styled.h2`
  color: #fff;

  .heading__container {
    display: inline-block;
    // transform: rotate(-1deg);
    background-color: #000;
    padding: 10px 20px;
    border-radius: 5px;
  }

  .heading__text {
    display: inline-block;
    // transform: rotate(1deg);
  }
`;

const Anchor = styled.a`
  display: flex;
  text-decoration: none;
  color: #000;
  line-height: 1em;
`;

const Log = styled.div`
  font-family: "Source Code Pro", monospace;
  background-color: #333;
  color: #fff;
  padding: 20px;
  overflow-wrap: ${(props) => (props.isLoading ? "break-word" : "normal")};
`;

function Results(props) {
  const { data } = props;
  return <>{JSON.stringify(data)}</>;
}

function Analysis(props) {
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
      <Log isLoading={isLoading}>
        {isLoading ? (
          <>We're crunching data {loadingString}</>
        ) : (
          <>
            <Results data={results} />
            <button onClick={() => reset()}>reset</button>
          </>
        )}
      </Log>
    </>
  );
}

function Home() {
  const [selectedRepository, setSelectedRepository] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  function reset() {
    setSelectedRepository(undefined);
    setSearchQuery("");
  }

  return (
    <>
      <Analysis
        reset={reset}
        active={selectedRepository !== undefined}
        repository={selectedRepository}
      />

      <Container active={selectedRepository === undefined}>
        <Link href="/how-it-works">
          <Anchor href="#">
            How it works
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              width={16}
              style={{ marginLeft: "5px" }}
            />
          </Anchor>
        </Link>
        <Heading>
          <span className="heading__container">
            <span className="heading__text">
              Get the score of a GitHub repository.
            </span>
          </span>
        </Heading>
        <Search
          state={{
            repository: [selectedRepository, setSelectedRepository],
            search: [searchQuery, setSearchQuery],
          }}
        />
      </Container>
    </>
  );
}

export default withLayout(Home);
