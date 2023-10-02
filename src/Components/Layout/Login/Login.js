import React, { useState } from "react";
import './Login.css';
import { ApiGateWay } from "../../ApiGateWay/ApiGateWay";
import { Navigate, Link } from "react-router-dom";
import logoImg from './../../images/mainlogo.png'
import { GoogleLogin } from '@react-oauth/google';
import loginImg from './../../images/login.jpg'

import jwt_decode from "jwt-decode";


function LoginComponent() {
    const [data, setData] = useState("")
    const [login, setLogin] = useState(false)
    


    const [UserName, setName] = useState("");
    const [password, setPass] = useState("");


    const handleSubmit = (firstname,lastname,email) => {
       
            ApiGateWay.Post('/api/user/Login', { "first_name": firstname,"last_name": lastname,"email": email}).then(response => response.json()).then(response => {
                if (response['status'] == "Ok") {
    
                    setLogin(true)
                    localStorage.setItem("CurrentUser", email)
                }
                else {
                    setLogin(false)
                    alert('Sign In failed, Please try again after some time')
    
    
                }
            })
          .catch ((error) => {
            alert('Sign In failed, Please try again after some time')
            
          });
       

       

    }

    return (
        <div className='login'>


            {login ? <Navigate to="/dashboard" /> : ""}
            <div className="container  d-none d-lg-block" style={{ padding: "100px" }}>
            <div className="card text-white h-100">
                            <div className="card-body">
                            <div className="row">
                <div className="col" >

                    <img  src={loginImg} width={"100%"} height={"100%"} />


                </div>
                <div className="col">


                    <div class="form-box shadow">
                        <div class="form-value">
                            <form action="#" onSubmit={handleSubmit}>
                                <img src={logoImg} width="180px" />
                                <br />
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        console.log(jwt_decode(credentialResponse['credential']))
                                        const firstname=jwt_decode(credentialResponse['credential'])['given_name']
                                        const lastname=jwt_decode(credentialResponse['credential'])['family_name']
                                        const email=jwt_decode(credentialResponse['credential'])['email']
                                        handleSubmit(firstname,lastname,email)

                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />;

                                {/* <div class="inputbox pushTop">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="text" onChange={(e) => setName(e.target.value)} required />
                        <label for="">Username</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password"  onChange={(e) => setPass(e.target.value)} required />
                        <label for="">Password</label>
                    </div>
                    <div class="forget">
                        <label for=""><input type="checkbox" />Remember Me  <a href="#">Forget Password</a></label>
                      
                    </div>
                    <button className="loginBtn">Log in</button>
                    <div class="register">
                        <p>Don't have a account <a href="#">Register</a></p>
                    </div> */}
                            </form>
                        </div>
                    </div>


                </div>


            </div>
                            </div>

                        </div>
                
                
                
            </div>
            <div className="container d-none d-sm-block d-lg-none" style={{ padding: "100px" }}>
            


            <div class="form-box-media-tab shadow">
                <div class="form-value">
                    <form action="#" onSubmit={handleSubmit}>
                        <img src={logoImg} width="180px" />
                        <br />
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                                console.log(jwt_decode(credentialResponse['credential']))
                                const firstname=jwt_decode(credentialResponse['credential'])['given_name']
                                const lastname=jwt_decode(credentialResponse['credential'])['family_name']
                                const email=jwt_decode(credentialResponse['credential'])['email']
                                handleSubmit(firstname,lastname,email)

                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;

                       
                    </form>
                </div>
            </div>


        </div>

            <div className="container d-sm-none d-lg-none" style={{ padding: "100px" }}>
            


                    <div class="form-box-media shadow">
                        <div class="form-value">
                            <form action="#" onSubmit={handleSubmit}>
                                <img src={logoImg} width="180px" />
                                <br />
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        console.log(jwt_decode(credentialResponse['credential']))
                                        const firstname=jwt_decode(credentialResponse['credential'])['given_name']
                                        const lastname=jwt_decode(credentialResponse['credential'])['family_name']
                                        const email=jwt_decode(credentialResponse['credential'])['email']
                                        handleSubmit(firstname,lastname,email)

                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />;

                               
                            </form>
                        </div>
                    </div>


                </div>


                      
                
                




        </div>

    );

}


export default LoginComponent;