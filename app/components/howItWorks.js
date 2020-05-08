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
  background-color: black;
  color: white;
  transition: max-height 0.2s ease-out;
  max-height: ${(props) => (props.active ? "200px" : "0")};
  overflow: hidden;

  div {
    padding: 3vw;
  }
`;

export function paragraph() {
  return (
    <p>
      Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      Lorem ipsum Lorem ipsum Lorem ipsum
    </p>
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
          How it works
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
