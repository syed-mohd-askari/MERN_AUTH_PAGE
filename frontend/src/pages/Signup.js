import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util'

function Signup() {

  const [signUpInfo,setSignUpInfo] = useState({
    name : "",
    email : "",
    password : ""
  })

  const navigate = useNavigate();

  //this function will check for each change in the value and collects the value with respect to their name
  const handleChange = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copySignUpInfo = {...signUpInfo };
    copySignUpInfo[name] = value;
    setSignUpInfo(copySignUpInfo);
  }

  // console.log("Login info ---->" ,signUpInfo);

  // to handle signup submission
  const handleSignUp = async (e) =>{
    e.preventDefault();
    const {name,email,password} = signUpInfo;

    // adding client side validation and showing popup on error
    if (!name || !email || !password){
      return handleError("Name , email , password are required ");
    }
    try{
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(signUpInfo)
      })

      const result = await response.json();
      const {success,message,error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate("/login")
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
      <h1>SignUp</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor='name'>Name</label>
          <input  onChange={handleChange} 
          type='text' name='name' 
          autoFocus placeholder='Enter your name ...'
          value={signUpInfo.name} />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input onChange={handleChange} 
          type='email' name='email' placeholder='Enter your email ...'
          value={signUpInfo.email} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input onChange={handleChange} 
          type='password' name='password' placeholder='Enter your password ...'
          value={signUpInfo.password} />
        </div>
        <button type="submit">Signup</button>

        {/* The <Link> component from react-router-dom is used to create navigational links in a React application. 
        It allows you to navigate to different routes without reloading the page, providing a smoother user experience. */}

        <span>Already have an account ?
          <Link to="/login">Login </Link>
        </span>
      </form>
      <ToastContainer/> 
    </div>
  )
}

export default Signup