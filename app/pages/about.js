import React from "react";

import withLayout from "../components/layout";

function About() {
  return (
    <>
      <p>
        This is an{" "}
        <a href="https://github.com/dannycalleri/gitly.dev">
          open source project
        </a>{" "}
        brought to you by{" "}
        <a href="https://github.com/dannycalleri/">Danny Calleri</a>.
      </p>
    </>
  );
}

export default withLayout(About);
