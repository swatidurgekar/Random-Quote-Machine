import "./quote-box.css";
import { BsTwitter } from "react-icons/bs";
import { useEffect, useState } from "react";

const QuoteBox = () => {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [color, setColor] = useState("#000000");
  let rendered = false;

  async function getData() {
    const colorValue = "#" + Math.floor(Math.random() * 1677215).toString(16);
    const response = await fetch("https://type.fit/api/quotes");
    if (response.ok) {
      const data = await response.json();
      const value = Math.floor(Math.random() * data.length);
      setQuote(data[value].text);
      setAuthor(data[value].author);
      if (colorValue === "ffffff") {
        setColor("#000000");
      } else {
        setColor(colorValue);
      }
    }
  }

  useEffect(() => {
    if (!rendered) {
      getData();
    }
    rendered = true;
  }, []);

  const newQuoteHandler = () => {
    getData();
  };

  return (
    <div className="page" style={{ backgroundColor: color }}>
      <div id="quote-box">
        <div id="text" style={{ color: color }}>
          <i
            className="fa fa-quote-left"
            aria-hidden="true"
            style={{ marginRight: "15px" }}
          ></i>
          {quote}
        </div>
        <p id="author" style={{ color: color }}>
          - {author}
        </p>
        <button style={{ backgroundColor: color }} id="tweet-button">
          <a
            id="tweet-quote"
            href="https://twitter.com/i/flow/login?redirect_after_login=%2Fintent%2Ftweet%3Fhashtags%3Dquotes%26related%3Dfreecodecamp%26text%3D%2522A%2520person%2520who%2520never%2520made%2520a%2520mistake%2520never%2520tried%2520anything%2520new.%2522%2520%2520Albert%2520Einstein"
            target="_blank"
          >
            <BsTwitter color="white" size="20px" />
          </a>
        </button>
        <button
          style={{ backgroundColor: color }}
          id="new-quote"
          onClick={newQuoteHandler}
        >
          New quote
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;
