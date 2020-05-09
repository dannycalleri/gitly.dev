import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const StyledAnchor = styled.a`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: ${(props) => (props.color ? props.color : "#000")};
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

export default function whaaat(props) {
  const { paragraph, color, label } = props;
  const [active, setActive] = useState(false);
  function toggle() {
    setActive(!active);
  }

  return (
    <>
      <div style={{ marginBottom: props.active ? "10px" : "0" }}>
        <StyledAnchor onClick={toggle} active={active} color={color}>
          {label}
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
