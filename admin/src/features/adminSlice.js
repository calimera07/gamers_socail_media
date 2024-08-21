import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
   id: "",
  
   token: "",
};

const adminSlice = createSlice({
   name: "admin",
   initialState,
   reducers: {
      login: (state, action) => {
         const { id, token } = action.payload;
         Cookies.set("admin", JSON.stringify(action.payload), { expires: 30 });
         state.id = id;
         
         state.token = token;
      },
      logout: state => {
         Cookies.remove("admin");
         state.id = "";
       
      },
     
   },
});

export const { login, logout} = adminSlice.actions;

export default adminSlice.reducer;
