import React from "react";
import { Link } from "react-router-dom";

import LoginAdmin from "../../components/LoginAdmin/LoginAdmin";

const LogAdmin = () => {

   return (
      <>
       
       <div className="img">
       <Link to ='/'>
                <img src='./6.png' alt=""></img>
                </Link>
            </div>
      <section>
        <LoginAdmin/>
      
      </section>
      </>
   );
};

export default LogAdmin;
