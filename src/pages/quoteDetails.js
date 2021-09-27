import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import { useRouteMatch } from "react-router";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/hooks/use-http";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getSingleQuote } from "../lib/lib/api";

const DUMMY = [
  { id: "q1", author: "Haari", text: "Learning React is Fun" },
  { id: "q2", author: "Kishann", text: "Learning React is Great" },
];
const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();  
  const {
    sendRequest,
    status,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote);
  const { quoteId } = params;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="centered focused">{error}</div>;
  }
  console.log(match);
  // const quote = DUMMY.find((item) => item.id === params.quoteId);
  if (!loadedQuote) {
    return <h1>Quote Not Found</h1>;
  }
  return (
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          {/* <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}> */}
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comment
          </Link>
        </div>
      </Route>
      {/* <Route path={`/quotes/${params.quoteId}/comments`} exact> */}
      <Route path={`${match.path}/comments`} exact>
        <Comments />
      </Route>
    </div>
  );
};
export default QuoteDetail;
