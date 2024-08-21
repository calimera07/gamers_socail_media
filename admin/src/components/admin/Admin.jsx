import React from "react";

import './admin.css'
import GetPost from '../../components/getpost/GetPost'
import GetArticle from '../../components/getArticle/GetArticle'
import GetUser from '../../components/getUser/GetUser'

function Admin() {
  
  

    return (
       
        <>  
<h1>Admin's interface</h1>
<div className="app">
<div className="App container mt-1">
                <GetPost/>
    </div>
    </div>
     <div className="app2">
     <div className="App container mt-5">
     <GetArticle/>
    </div>
    </div>
    <div className="app3">
     <div className="App container mt-5">
     <GetUser/>
    </div>
    </div>

</>
    );
}

export default Admin;
