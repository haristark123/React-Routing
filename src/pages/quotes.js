import QuoteList from "../components/quotes/QuoteList";
import { getAllQuotes } from "../lib/lib/api";
import useHttp from "../hooks/hooks/use-http";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
// const DUMMY = [
//   { id: "q1", author: "Haari", text: "Learning React is Fun" },
//   { id: "q2", author: "Kishann", text: "Learning React is Great" },
// ];
const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
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
  if (status === "completed" && (!loadedQuote || loadedQuote.length === 0)) {
    return <NoQuotesFound />;
  }
  return (
    <div>
      <QuoteList quotes={loadedQuote} />
    </div>
  );
};
export default AllQuotes;
