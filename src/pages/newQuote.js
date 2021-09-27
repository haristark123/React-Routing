import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router";
import useHttp from "../hooks/hooks/use-http";
import { addQuote } from "../lib/lib/api";
import { useEffect } from "react";

const NewQuote = (props) => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status,history]);
  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    sendRequest(quoteData);
  };
  return (
    <div>
      <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler} />
    </div>
  );
};
export default NewQuote;
