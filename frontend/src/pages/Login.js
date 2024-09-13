import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util'

function Login() {

  const [loginInfo,setLoginInfo] = useState({
    email : "",
    password : ""
  })

  const navigate = useNavigate();

  //this function will check for each change in the value and collects the value with respect to their name
  const handleChange = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copyLoginInfo = {...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  

  // to handle login submission
  const handleLogin = async (e) =>{
    e.preventDefault();
    const {email,password} = loginInfo;

    // adding client side validation and showing popup on error
    if (!email || !password){
      return handleError("email , password are required ");
    }
    try{
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(loginInfo)
      })

      const result = await response.json();
      const {success,message,jwtoken,name,error} = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem("token",jwtoken);
        localStorage.setItem("loggedInUser",name);
        setTimeout(()=>{
          navigate("/home")
        },1000)
      }
      else if (error){
        // The ?. operator in JavaScript is known as the optional chaining operator.
        // It allows you to safely access deeply nested properties of an object without having to explicitly check if 
        // each reference in the chain is valid.
        // If any part of the chain is null or undefined, the entire expression will return undefined 
        // instead of throwing an error.
        const details = error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message);
      }
      console.log(result);

    }
    catch(err){
      handleError(err);
    }


  }
  return (

    // in react we use classname instead of class
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input onChange={handleChange} 
          type='email' name='email' placeholder='Enter your email ...'
          value={loginInfo.email} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input onChange={handleChange} 
          type='password' name='password' placeholder='Enter your password ...'
          value={loginInfo.password} />
        </div>
        <button type="submit">Login</button>

        {/* The <Link> component from react-router-dom is used to create navigational links in a React application. 
        It allows you to navigate to different routes without reloading the page, providing a smoother user experience. */}

        <span>Don't have an account ?
          <Link to="/signup">SignUp</Link>
        </span>
      </form>
      <ToastContainer/>  
    </div>
  )
}

export default Login