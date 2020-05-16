export function analysisParagraph() {
  return (
    <>
      <p>
        <strong>Stars:</strong> High score on stars means being above our
        benchmark (500 stars).
      </p>
      <p>
        <strong>Pull requests:</strong> High score on pull requests means that
        there are <strong>more closed and merged PRs than opened ones</strong>.
      </p>
      <p>
        <strong>Issues:</strong> High score means that active members of the
        repository comment issues frequently! It means that the{" "}
        <strong>community is very active</strong>.
      </p>
      <p>
        <strong>Commits:</strong> High score means that{" "}
        <strong>commits are equally distributed over time</strong>.
      </p>
      <p>
        <strong>Documentation:</strong> High score means that we found both
        <strong>active GitHub pages and wiki</strong>. We don't check writing
        quality - at the moment ;)
      </p>
      <p>
        <strong>Final score:</strong> Sum of the previous scores with different
        weights. High score means the repository in question rocks! Please adopt
        it!
      </p>
      <p>
        <strong>Please</strong> read our analysis critically, because a low
        score doesn't necessarily mean that a project sucks, it means that the
        activity on GitHub isn't so good. That could mean low quality, but
        remember that the algorithm doesn't take a limited amount of variables
        into account.
      </p>
    </>
  );
}

export function mainPageParagraph() {
  return (
    <>
      <p>
        Have you ever been{" "}
        <strong>
          wondering if a particular library or repository is active enough to
          support it
        </strong>{" "}
        and make it a dependency to rely on? We do! And this project gives you a
        first hint whether the repository at hand is good for you.
      </p>
      <h3>How it works?</h3>
      <p>
        We use <strong>GitHub APIs</strong> to collect public data about a
        repository and attach a score to it. The collected data includes the
        number of stars, documentation, the last few hundreds of commits, issues
        and pull requests.
      </p>
    </>
  );
}
