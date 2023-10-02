import React,{ useState,useMemo } from "react";
import logo from './../images/mainlogo.png';
import {Route, Navigate} from 'react-router-dom';
function HeaderMain(){
  const [login,setLogin]=useState(true)

  useMemo(()=>{
    if (!localStorage.getItem('CurrentUser')){
      setLogin(false)
  
    }
  
}, [login])

 
  
return(

<div>
{login?"":<Navigate to ="/" /> }
<nav className="navbar navbar-expand-lg navbar-light bg-light1">
  <div className="container-fluid">
    <a className="navbar-brand" href="https://www.yoopiq.com" target="_blank"><img src={logo} style={{width:"150px"}}/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 float-end">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="https://www.yoopiq.com" target="_blank">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.yoopiq.com" target="_blank">Case Studies</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.yoopiq.com" target="_blank">Experiences</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.yoopiq.com" target="_blank">Blog</a>
        </li>
        <li className="nav-item">
          <a className="touch" href="https://www.yoopiq.com" target="_blank">Get in Touch</a>
        </li>
        
      
      </ul>
    
    </div>
  </div>
</nav>
</div>

)


}

export default HeaderMain;