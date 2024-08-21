import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginadmin } from "../../features/adminSlice";
import { loginAdmin } from "../../API";
import useFetch from "../../hooks/useFetch";
import { setIsLoading } from "../../features/modalSlice";
import { useNavigate} from "react-router";

import "./auth.css";

const LoginAdmin = ({setIsAdmin}) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const customFetch = useFetch();
   const navigate = useNavigate();


   const loginHandler = async (e) => {
      e.preventDefault();
      dispatch(setIsLoading(true));
      const data = await customFetch(loginAdmin, email, password);
      if (data) dispatch(loginadmin(data));
      dispatch(setIsLoading(false));
      if(data){
         navigate.push("/admin");

      }
   };

   return (
      <div className="auth">
      <form onSubmit={loginHandler} className="login">
         <label htmlFor="login-email">Email</label>
         <input
            type="email"
            id="login-email"
            placeholder="admin@exp.com"
            value={email}
            onChange={(e) => {
               setEmail(e.target.value);
            }}
         />
         <label htmlFor="login-password">Password</label>
         <input
            type="password"
            id="login-password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
               setPassword(e.target.value);
            }}
         />
         <button type="submit">Login</button>
        
        
      </form>
      </div>
   );
};

export default LoginAdmin;
