import React, { useEffect } from "react";
import Input from "../../components/Input/Input";
import Comments from "../../components/Commentes/Comments";
import Article from "../../components/Article/Article";
import { fetchArticle, commentArticle } from "../../API";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSingleArticle } from "../../features/articleSlice";
import useFetch from "../../hooks/useFetch";
import "./SingleArticle.css";

const SingleArticle = () => {
    const { id } = useParams();
    const { token } = JSON.parse(Cookies.get("user"));
    const { singleArticle: article } = useSelector(state => state.article);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    useEffect(() => {
        (async () => {
            const data = await customFetch(fetchArticle, id, token);
            if (data) dispatch(setSingleArticle(data.articles));
        })();
    }, [id, token, dispatch, customFetch]);

    const commentHandler = async comment => {
        const data = await customFetch(commentArticle, article._id, comment, token);
        if (data) dispatch(setSingleArticle(data.articles));
    };

    return (
        <section className="singlepost">
            <article className="singlepost__left">{article._id && <Article singlearticle={true} article={article} />}</article>
            <article className="singlepost__comments">
                <div>
                    <Comments article={article} />
                    <Input placeholder="Write a comment..." handler={commentHandler} />
                </div>
            </article>
           
        </section>
    );
};

export default SingleArticle;
