import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../API";
import Online from "../../components/Online/Online";

import Article from "../../components/Article/Article";
import CreateArticle from "../../components/CreateArticle/CreateArticle";
import { setArticles } from "../../features/articleSlice";
import useFetch from "../../hooks/useFetch";
import "./shop.css";

const Shop = () => {
    const { token } = JSON.parse(Cookies.get("user"));
    const { articles } = useSelector(state => state.article);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    useEffect(() => {
        (async () => {
            const data = await customFetch(fetchArticles, token);
            if (data) dispatch(setArticles(data.articles));
        })();
    }, [dispatch, token, customFetch]);

    return (
        <section className="shop">
            <main className="shop__left">
                <CreateArticle />
                {articles.map(article => (
                    <Article article={article} key={article._id} />
                ))}
            </main>
            <aside className="home__right">
                <Online />
            </aside>
        </section>
    );
};

export default Shop;
