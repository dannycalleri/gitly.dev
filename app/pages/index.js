import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

import Search from "../components/search";
import withLayout from "../components/layout";

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

function Home() {
  return (
    <>
      <Link href="/profile">
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
      <Search />
    </>
  );
}

export default withLayout(Home);
