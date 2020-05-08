import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const StyledAnchor = styled.a`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  line-height: 1em;
`;

export default function Anchor(props) {
  const { href, label, ...others } = props;
  return (
    <StyledAnchor href={href} {...others}>
      {label}
      <FontAwesomeIcon
        icon={faLongArrowAltRight}
        width={16}
        style={{ marginLeft: "5px" }}
      />
    </StyledAnchor>
  );
}
