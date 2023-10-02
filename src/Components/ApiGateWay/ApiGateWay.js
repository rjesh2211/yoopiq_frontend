import React, { Component } from 'react';



export const ApiGateWay = {
  
  Post,
  Get,
  PostFile,
  
};
 
const endip='https://yoopiq-backend.azurewebsites.net'
// const endip='http://0.0.0.0:8001'

function  Post (url,payload){

    const requestOptions = {
      method: 'POST',
      crossDomain:true,
      headers: { 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("Token")  },
      body: JSON.stringify(payload)
  };
    
     
      return fetch(endip+url, requestOptions)
      
  
      
        
  
  
  };

  function  PostFile (url,payload){

    const requestOptions = {
      method: 'POST',
      body: payload
      
  };
    
     
      return fetch(endip+url, requestOptions)
      
  
      
        
  
  
  };


 function  Get (url){

  const requestOptions = {
    crossDomain:true,
    method: 'GET',
    headers: {Authorization: 'Bearer ' + localStorage.getItem("Token") }
  
  };
  
     
      return fetch(endip+url, requestOptions)
     
  
      
        
  
  
  };
  




