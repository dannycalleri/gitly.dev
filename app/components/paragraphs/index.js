export function analysisParagraph() {
  return (
    <>
      <p>
        Please read our analysis critically, because a low score doesn't
        necessarily means that a project sucks, it means that the activity on
        GitHub isn't as good as it could be. That could mean low quality but
        also that the algorithm wasn't able to take into account other
        parameters.
      </p>
      <p>
        <strong>Stars:</strong> High score on stars means being well above our
        benchmark (500 stars).
      </p>
      <p>
        <strong>Pull requests:</strong> High score on pull requests means that
        there are <strong>more closed and merged PRs than opened ones</strong>{" "}
        starving.
      </p>
      <p>
        <strong>Issues:</strong> High score means that active members of the
        repository, being them contributors or team members answer them
        frequently! It means that the <strong>community is very active</strong>.
      </p>
      <p>
        <strong>Commits:</strong> High score means that{" "}
        <strong>commits are equally distributed over time</strong>.
      </p>
      <p>
        <strong>Documentation:</strong> High score means that we found both
        <strong>active pages and wiki</strong>. We don't quality, only if they
        are active or not.
      </p>
      <p>
        <strong>Final score:</strong> Sum of the previous scores with different
        weights. High score means the repository in question is pretty good, you
        should consider adopting it.
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
      <h3>What?</h3>
      <p>
        We use <strong>GitHub APIs</strong> to collect public data about a
        repository and attach a score to it. The collected data includes the
        number of stars, documentation, the last few hundreds of commits, issues
        and pull requests.
      </p>
    </>
  );
}
