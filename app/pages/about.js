import React from "react";

import withLayout from "../components/layout";

function About() {
  return (
    <>
      <p>
        This is an open source project brought to you by{" "}
        <a href="https://github.com/dannycalleri/">Danny Calleri</a>.
      </p>
    </>
  );
}

export default withLayout(About);
