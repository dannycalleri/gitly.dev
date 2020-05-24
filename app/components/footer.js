import React from "react";
import styled from "styled-components";
import { Container } from "./Container";

const StyledFooter = styled.footer`
  margin-top: 30px;
  color: #999;
  text-align: center;

  ul {
    display: inline-block;
    list-style: none;
    padding: 0;

    li {
      display: inline-block;

      a  {
        margin: 0 10px;
        color: #999;
      }
    }
  }
`;

export default function () {
  return (
    <StyledFooter>
      <Container>
        Copyright &copy; Danny Calleri 2020
        <ul>
          <li>
            <a target="_blank" href="https://www.buymeacoffee.com/dannyc">
              Support us
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/dannycalleri/gitly.dev">
              Contribute
            </a>
          </li>
        </ul>
      </Container>
    </StyledFooter>
  );
}
