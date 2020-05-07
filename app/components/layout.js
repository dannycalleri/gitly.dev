import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";

import Search from "../components/search";

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

const Container = styled.div`
  max-width: 800px;
  padding: 0vw 5vw;
`;

const LogoContainer = styled.h1`
  display: flex;
  flex: 1;
  font-family: "Roboto", sans-serif;
  color: #000;
  margin: 0;

  a:hover {
    text-decoration: none;
  }
`;

const Logo = styled.span`
  display: inline-block;
  background-color: #ffe676;
  padding: 5px 12px;
  color: #fff;
  line-height: 1em;
  margin-right: 10px;
`;

const LogoIcon = styled(FontAwesomeIcon)``;

const Anchor = styled.a`
  display: flex;
  text-decoration: none;
  color: #000;
  line-height: 1em;
`;

const StyledNavigation = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  flex: 1;
  margin: 0;
`;

const Navigation = () => {
  return (
    <StyledNavigation>
      <li>
        <Link href="/about">
          <a href="#">About</a>
        </Link>
      </li>
    </StyledNavigation>
  );
};

export default function withLayout(Content) {
  return class Layout extends React.Component {
    static async getInitialProps(ctx) {
      const pageProps = await (Content.getInitialProps &&
        Content.getInitialProps(ctx));
      return { ...pageProps };
    }

    render() {
      const props = this.props;
      return (
        <>
          <Head>
            <title>gitly.dev</title>
            <link rel="icon" href="/favicon.ico" />
            <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Roboto:wght@900&display=swap"
              rel="stylesheet"
            />
          </Head>

          <main>
            <header>
              <LogoContainer>
                <a href="#">
                  <Logo>
                    <LogoIcon icon={faCodeBranch} width={24} />
                  </Logo>
                  gitly.dev
                </a>
              </LogoContainer>
              <Navigation />
            </header>
            <Container>
              <Content {...props} />
            </Container>
          </main>

          <footer></footer>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              // font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              //   Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              //   sans-serif;
              font-family: "Open Sans", sans-serif;
            }

            * {
              box-sizing: border-box;
            }

            a:hover {
              text-decoration: underline;
            }

            header {
              display: flex;
              padding-bottom: 5vw;
            }

            header a {
              display: flex;
              color: #000;
              text-decoration: none;
            }

            main {
              max-width: 900px;
              margin: auto;
              padding: 5vw;
            }
          `}</style>
        </>
      );
    }
  };
}
