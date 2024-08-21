import axios from "axios";
import React, { useEffect, useState } from "react";
import "./loading.css";

const Loading = () => {
   const [quote, setQuote] = useState("");
   useEffect(() => {
      (async () => {
         const { data } = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
         setQuote(data.text);
      })();
      setTimeout(() => {
         setQuote(q => {
            if (q) return q;
            return "Your internet is slower than my crushs reply :(";
         });
      }, 3000);
   }, []);
   return (
      <section className="loading">
         <div className="loading__circle"></div>
         
         <p>{quote}</p>
      </section>
   );
};

export default Loading;
