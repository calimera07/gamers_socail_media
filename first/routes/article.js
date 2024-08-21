const express = require("express");
const {
   createArticles,
   getArticles,
   likeArticle,
   reportArticle
   ,
   commentArticle,
   getArticle,
   deleteArticle,
} = require("../controllers/article");
const router = express.Router();

router.route("/").post(createArticles).get(getArticles);
router.route("/:id").get(getArticle).delete(deleteArticle);
router.route("/like").patch(likeArticle);
router.route("/report").patch(reportArticle);
router.route("/comment").patch(commentArticle);

module.exports = router;
