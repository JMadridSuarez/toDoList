import React, { useState } from 'react'
import {useCookies} from 'react-cookie';

export default function Auth() {
  const backendUrl = process.env.BACKEND_URL;
  
  const [cookies,setCookie,removeCookie] = useCookies(null)
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);


  const viewLogin = (status) =>{
    setError(null);
    setIsLogin(status);
  }

  const handleSubmit = async(e, endpoint) =>{
    e.preventDefault();
    
    if(!isLogin && password !== confirm){
      setError('Make sure passwords match!')
      console.log(error); 
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/v1/${endpoint}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({email,password})
      }
    )
    const data = response.json();
    if(response.detail){
      setError(response.detail)
    }else{
      setCookie('Email',data.email);
      setCookie('AuthToken',data.token);
      window.location.reload();
    }
    
  }

  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form>
          <h2>{isLogin ? 'Please Log in':'Please sign up'}</h2>

          <input 
          type='email' 
          placeholder='email'
          onChange={(e)=>setEmail(e.target.value)}
          />

          <input 
          type='password' 
          placeholder='password'
          onChange={(e)=>setPassword(e.target.value)}
          />

          {!isLogin && <input 
          type='password' 
          placeholder='confirm password'
          onChange={(e)=>setConfirm(e.target.value)}
          />}

          <input type='submit' className='create' onClick={(e)=>handleSubmit(e, isLogin ? 'login': 'signup')}/>
          
          {error && <p>{error}</p>}
        </form>
        <div className='auth-options'>
            <button 
            onClick={()=>viewLogin(false)}
            style={{backgroundColor : !isLogin ? 'rgb(188,188,188)': 'rgb(255,255,255)'}}
            >Sign Up</button>
            <button 

            onClick={()=>viewLogin(true)}
            style={{backgroundColor : isLogin ? 'rgb(188,188,188)': 'rgb(255,255,255)'}}
            >Login</button>
        </div>

      </div>
    </div>
  )
}
