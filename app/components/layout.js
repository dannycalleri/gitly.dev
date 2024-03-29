import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

import GitlyLogo from "./logo";
import Footer from "./footer";
import * as Tracking from "./tracking";
import { Container } from "./Container";

const LogoContainer = styled.h1`
  display: flex;
  flex: 1;
  font-family: "Roboto", sans-serif;
  color: #000;
  margin: 0;

  a {
    display: inline-block;
  }

  a:hover {
    text-decoration: none;
  }

  sup {
    font-family: "Open Sans";
    font-weight: 400;
    font-size: small;
    margin-left: 5px;
  }

  @media (max-width: 600px) {
    flex: 2;
  }
`;

const Logo = styled.span`
  margin-right: 10px;

  svg {
    width: 60px;
    vertical-align: middle;
  }

  @media (max-width: 600px) {
    svg {
      width: 40px;
    }
  }
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

    componentDidMount() {
      Tracking.initialize();
      Tracking.recordPageView();
    }

    render() {
      const props = this.props;
      return (
        <>
          <Head>
            <title>gitly.dev - Check the quality of a GitHub repository</title>
            <link rel="icon" href="/favicon.ico" />
            <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Roboto:wght@900&family=Source+Code+Pro&display=swap"
              rel="stylesheet"
            />
          </Head>

          <a
            href="https://github.com/dannycalleri/"
            className="github-corner"
            aria-label="View source on GitHub"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 250 250"
              style={{
                fill: "#151513",
                color: "#fff",
                position: "absolute",
                top: "0",
                border: 0,
                right: 0,
              }}
              aria-hidden="true"
            >
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
              <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor"
                style={{ transformOrigin: "130px 106px" }}
                className="octo-arm"
              ></path>
              <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor"
                className="octo-body"
              ></path>
            </svg>
          </a>

          <main>
            <header>
              <LogoContainer>
                <a href="/">
                  <Logo>
                    <GitlyLogo />
                  </Logo>
                  gitly.dev
                  <sup>(beta)</sup>
                </a>
              </LogoContainer>
              <Navigation />
            </header>
            <Container>
              <Content {...props} />
            </Container>
            <Footer />
          </main>

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

            a {
              color: black;
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

            .github-corner:hover .octo-arm {
              animation: octocat-wave 560ms ease-in-out;
            }
            @keyframes octocat-wave {
              0%,
              100% {
                transform: rotate(0);
              }
              20%,
              60% {
                transform: rotate(-25deg);
              }
              40%,
              80% {
                transform: rotate(10deg);
              }
            }
            @media (max-width: 500px) {
              header {
                margin-top: 30px;
                font-size: 0.85em;
              }

              .github-corner:hover .octo-arm {
                animation: none;
              }
              .github-corner .octo-arm {
                animation: octocat-wave 560ms ease-in-out;
              }
            }
          `}</style>
        </>
      );
    }
  };
}
