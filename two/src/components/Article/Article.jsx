import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentArticle, deleteArticle,reportArticle, likeArticle } from "../../API";
import { popArticle, setArticles, setSingleArticle } from "../../features/articleSlice";
import { dp, likeIcon, likeOutlined } from "../../assets";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { hideModal, showModal } from "../../features/modalSlice";
import useFetch from "../../hooks/useFetch";
import useDate from "../../hooks/useDate";
import "./Article.css";
import Options from "../Options/Options";

const Article = ({ singlearticle, article }) => {
    const { token } = JSON.parse(Cookies.get("user"));
    const createdAt = useDate(article.createdAt);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    //global states
    const { id } = useSelector(state => state.user);
    let { articles } = useSelector(state => state.article);
    const isOwnArticle = id === article.createdBy;
    const isLiked = article?.likes?.includes(id);
    const isReported = article?.report?.includes(id);


    const sliceArticles = (articles, data) => {
        const index = articles.reduce((acc, article, i) => {
            if (article._id === data.articles._id) return i;
            return acc;
        }, -1);
        let slicedArticles = [...articles];
        slicedArticles.splice(index, 1, data.articles);
        return slicedArticles;
    };

    const likeHandler = async () => {
        const data = await customFetch(likeArticle, article._id, token, !isLiked);
        if (data) {
            if (singlearticle) {
                dispatch(setSingleArticle(data.articles));
            } else {
                let slicedArticles = sliceArticles(articles, data);
                dispatch(setArticles(slicedArticles));
            }
        }
    };

    const reportHandler = async () => {
        const data = await customFetch(reportArticle, article._id, token, !isReported);
        if (data) {
            if (singlearticle) {
                dispatch(setSingleArticle(data.articles));
            } else {
                let slicedArticles = sliceArticles(articles, data);
                dispatch(setArticles(slicedArticles));
            }
        }
    };


    const commentHandler = async comment => {
        const data = await await customFetch(commentArticle, article._id, comment, token);
        if (data) {
            let slicedArticles = sliceArticles(articles, data);
            dispatch(setArticles(slicedArticles));
        }
    };

    const deleteHandler = async () => {
        await customFetch(deleteArticle, article._id, token);
        dispatch(popArticle(article._id));
        dispatch(showModal("Deleted"));
        setTimeout(() => dispatch(hideModal()), 4000);
    };

    return (
        <article className={singlearticle ? "article halfborder" : "article"}>
            <header>
                <Link to={`/user/${article.createdBy}`}>
                    <img src={article.userDetails.image || dp} alt="profileImage" className="article__dp roundimage" />
                </Link>
                <div>
                    <h3>{article.userDetails.name}</h3>
                    <p>{createdAt}</p>
                </div>
                {isOwnArticle && <Options deleteHandler={deleteHandler} />}
            </header>
            <Link to={`/article/${article._id}`} className="article__details">
                {article.caption && <p className="article__caption">{article.caption}</p>}
               {article.code && <p className="article__caption">Code : {article.code}</p>}

                {article.prix && <p className="article__prix">{article.prix}$</p>}

                {article.image?.src && <img src={article.image?.src} alt="article_image" className="article__image" />}
            </Link>
            <div className="article__footer">
                <div className="article__reactions">
                    <img src={isLiked ? likeIcon : likeOutlined} alt="like" onClick={likeHandler} />
                    <p>{article.likes.length || ""}</p>
                    <div className="report" onClick={reportHandler} >
                        {isReported ?  <ion-icon name="alert-circle-sharp"></ion-icon> : <ion-icon name="alert-circle-outline"></ion-icon>}
                    </div>
                    <p>{article.report.length || ""}</p>
                </div>
                {singlearticle|| <Input placeholder={"Write a comment..."} handler={commentHandler} />}
            </div>
        </article>
    );
};

export default Article;
