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
  transition: max-height 0.2s ease-out, padding 0.3s ease-out;
  padding: ${(props) => (props.active ? "20px" : "0")};
  padding-top: 0;
  border-radius: 5px;
  background-color: #ffe676;
  color: black;
  max-height: ${(props) => (props.active ? "1200px" : "0")};
  overflow: hidden;
`;

export default function whaaat(props) {
  const { paragraph, color, label, title } = props;
  const [active, setActive] = useState(false);
  function toggle() {
    setActive(!active);
  }

  return (
    <>
      <div
        style={{ display: "flex", marginBottom: props.active ? "10px" : "0" }}
      >
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
        <h3>{title}</h3>
        <div>{paragraph()}</div>
      </Box>
    </>
  );
}
