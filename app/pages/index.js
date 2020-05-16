import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";

import Analysis from "../components/analysis";
import Search from "../components/search";
import withLayout from "../components/layout";
import Whaaat from "../components/whaaat";
import { mainPageParagraph } from "../components/paragraphs";

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

function Home() {
  const [selectedRepository, setSelectedRepository] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  function reset() {
    setSelectedRepository(undefined);
    window.history.pushState({}, `gitly.dev`, `/`);
  }

  return (
    <>
      <Analysis
        reset={reset}
        active={selectedRepository !== undefined}
        repository={selectedRepository}
      />

      <Container active={selectedRepository === undefined}>
        <Whaaat
          label="What? How it works?"
          title="What?"
          paragraph={mainPageParagraph}
        />
        <Heading>
          <span className="heading__container">
            <span className="heading__text">
              Get the quality score of a GitHub repository.
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
