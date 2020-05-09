import { Log } from "../../components/log";
import Results from "../../components/results";
import withLayout from "../../components/layout";
import { analysisParagraph } from "../../components/paragraphs";
import Whaaat from "../../components/whaaat";
import * as API from "../../api";

function Score(props) {
  const { id, scoreData } = props;
  return (
    <>
      <h1>{id}</h1>
      <Whaaat label="Whaaat?" paragraph={analysisParagraph} />
      <Log isLoading={false}>
        <Results data={scoreData} />
      </Log>
    </>
  );
}

Score.getInitialProps = async (context) => {
  let id;
  let scoreData;
  try {
    id = context.query.id;
    scoreData = await API.getAnalysis(id);
  } catch (err) {
    console.log("Error while fetching score");
    console.log(err);
  }

  return {
    id,
    scoreData,
    error: scoreData ? undefined : "Some error occurred",
  };
};

export default withLayout(Score);
