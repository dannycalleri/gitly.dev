import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const StyledAnchor = styled.a`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  line-height: 1em;

  span.icon {
    transition: transform 0.2s ease-out;
    transform: ${(props) => (props.active ? "rotate(90deg)" : "rotate(0deg)")}
`;

const Box = styled.div`
  border-radius: 5px;
  background-color: #ffe676;
  color: black;
  transition: max-height 0.2s ease-out;
  max-height: ${(props) => (props.active ? "500px" : "0")};
  overflow: hidden;

  div {
    padding: 20px;
  }
`;

export function paragraph() {
  return (
    <>
      <h3>Why?</h3>
      <p>
        Have you ever been{" "}
        <strong>
          wondering if a particular library or repository is active enough to
          support it
        </strong>{" "}
        and make it a dependency to rely on? We do! And this project gives you a
        first hint whether the repository at hand is good for you.
      </p>
      <h3>What?</h3>
      <p>
        We use <strong>GitHub APIs</strong> to collect public data about a
        repository and attach a score to it. The collected data includes the
        number of stars, documentation, the last few hundreds of commits, issues
        and pull requests.
      </p>
    </>
  );
}

export default function howItWorks(props) {
  const [active, setActive] = useState(false);
  function toggle() {
    setActive(!active);
  }

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <StyledAnchor onClick={toggle} active={active}>
          What? How it works?
          <span className="icon">
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              width={16}
              style={{ marginLeft: "5px" }}
            />
          </span>
        </StyledAnchor>
      </div>
      <Box active={active}>
        <div>{paragraph()}</div>
      </Box>
    </>
  );
}
