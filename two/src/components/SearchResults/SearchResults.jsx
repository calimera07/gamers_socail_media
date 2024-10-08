import React from "react";
import { Link } from "react-router-dom";
import "./searchresult.css";

const SearchResults = ({ searchResult, reset }) => {
   return (
      <div className="search-results">
         <div>
            <h3>Posts</h3>
            {searchResult.posts?.map(post => (
               <Link to={`/post/${post._id}`}>
                  <p onClick={reset}>{post.caption}</p>
               </Link>
            ))}
         </div>
         <div>
            <h3>Articles</h3>
            {searchResult.articles?.map(article => (
               <Link to={`/article/${article._id}`}>
                  <p onClick={reset}>{article.caption}</p>
               </Link>
            ))}
         </div>
        
         <div>
            <h3>Gamers</h3>
            {searchResult.user?.map(val => (
               <Link to={`/user/${val._id}`}>
                  <p onClick={reset}>{val.name}</p>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default SearchResults;
