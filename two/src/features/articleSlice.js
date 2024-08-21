const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   articles: [],
   singleArticle: {},
};

const articleSlice = createSlice({
   name: "article",
   initialState,
   reducers: {
      setArticles: (state, action) => {
         state.articles = action.payload;
      },
      pushArticle: (state, action) => {
         state.articles = [action.payload, ...state.articles];
      },
      popArticle: (state, action) => {
         state.articles = [...state.articles.filter((article) => article._id !== action.payload)];
      },
      setSingleArticle: (state, action) => {
         state.singleArticle = action.payload;
      },
   },
});

export const { setArticles, pushArticle, setSingleArticle, popArticle } = articleSlice.actions;

export default articleSlice.reducer;
