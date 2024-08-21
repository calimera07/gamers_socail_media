import React, { useState } from "react";
import { dp, logoutIcon, closeIcon, searchIcon, hamburger } from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { fetchArticles, fetchPosts, fetchUsers } from "../../API";
import { toggleSidebar } from "../../features/modalSlice";
import useFetch from "../../hooks/useFetch";
import SearchResults from "../SearchResults/SearchResults";
import "./appbar.css";

const Appbar = () => {
    //global states
    const {
        user: { id, token, profileImage },
        modal: { isSidebarVisible },
    } = useSelector(state => state);

    //local states
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState({});

    const dispatch = useDispatch();
    const customFetch = useFetch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    const searchHandler = async e => {
        e.preventDefault();
        const { articles } = await customFetch(fetchArticles, token, null, query);

        const { posts } = await customFetch(fetchPosts, token, null, query);
        const { user } = await customFetch(fetchUsers, token, query);
        setSearchResult({ posts, user,articles });
    };

    const reset = () => {
        setQuery("");
        setSearchResult({});
    };

    return (
        <header className="appbar">
            
            <div className="img">
            <Link to ='/'>
                <img src='./6.png' alt=""></img>
                </Link>
            </div>
            <div className="hamburger" onClick={() => dispatch(toggleSidebar(!isSidebarVisible))}>
                <img src={isSidebarVisible ? closeIcon : hamburger} alt="hamburger" />
            </div>
            <form onSubmit={searchHandler} className="searchform">
                <button type="submit" aria-label="search">
                    <img src={searchIcon} alt="search" />
                </button>
                <input type="text" placeholder="Tap to search..." value={query} onChange={e => setQuery(e.target.value)} />
                <button onClick={reset} type="button" aria-label="clear search">
                    <img src={closeIcon} alt="close" className="close" />
                </button>
                {(searchResult.posts || searchResult.user || searchResult.articles) && <SearchResults searchResult={searchResult} reset={reset} />}
            </form>
            <nav className="appbar__profile">
                <Link to={`/user/${id}`}>
                    <img src={profileImage || dp} alt="profileImage" className="appbar__profile__dp" title="profile" />
                </Link>
                <div className="home">
                <Link style={{color:'white'}} to ='/'>
               <ion-icon name="home"></ion-icon>           </Link>
              
                
                <Link style={{color:'white'}} to="/chat">
                <ion-icon name="chatbox"></ion-icon>
                </Link>
                <Link style={{color:'white'}} to='/shop'>
                <ion-icon name="cart"></ion-icon>
                </Link>
                <button onClick={logoutHandler} aria-label="logout">
                    <img src={logoutIcon} alt="logoutIcon" className="appbar__profile__logout" title="logout" />
                </button>
                </div>
            </nav>
        </header>
    );
};

export default Appbar;
