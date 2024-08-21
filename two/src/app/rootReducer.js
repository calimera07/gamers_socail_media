import { combineReducers } from "redux";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modalSlice";
import postReducer from "../features/postSlice";
import articleReducer from "../features/articleSlice";
import messageReducer from "../features/messageSlice";
import socketReducer from "../features/socketSlice";

export default combineReducers({
   user: userReducer,
   modal: modalReducer,
   post: postReducer,
   article:articleReducer,
   message: messageReducer,
   socket: socketReducer,
});
