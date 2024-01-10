import { useState, useEffect } from "react";
import "./QuoteBox.css";

export const QuoteBox = () => {
  const API_URL = "/api/quotes/random?tags=technology,famous-quotes";

  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(true);

  const getQuote = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("response", response);
      const json = await response.json();

      setQuote(json);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(quote);

  return (
    <div className="quote-box">
      <blockquote className="quoteContent">{quote[0].content}</blockquote>
      <cite title="Source Title">{quote[0].author}</cite>
    </div>
  );
};
