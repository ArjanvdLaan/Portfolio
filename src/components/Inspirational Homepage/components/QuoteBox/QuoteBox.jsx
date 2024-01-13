import { useState, useEffect } from "react";
import "./QuoteBox.css";

export const QuoteBox = () => {
  const API_URL = "https://official-joke-api.appspot.com/random_joke";

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
      console.log("API response:", json);
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
      <blockquote className="quoteContent">{quote.setup}</blockquote>
      <cite title="Source Title">{quote.punchline}</cite>
      <footer>
      <p className="attribution"><a href="https://github.com/15Dkatz" target="_blank" rel="noopener noreferrer">&copy;</a></p>
    </footer>
    </div>
  );
};
