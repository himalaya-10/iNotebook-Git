import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'
export default function Home() {
  const context = useContext(noteContext)
  const {login} = context
  const [text,setText]=useState({email:"",password:""})
  /////
  const googleAuth=(e)=>{
    // e.preventDefault()
    // window.location.href = "http://localhost:8000/auth/google";
    window.open("http://localhost:8000/auth/google/callback","_self");


  }
  /////

  const log=(e)=>{
    e.preventDefault()
    login(text);
  }

  const textChange=(e)=>{
    setText({...text,[e.target.name]:e.target.value})
}
  return (
    <>
    <div className='login m-5' style={{ textAlign: "center" }}>
      <h1>Login To Your cloud Notebook</h1>
      </div>
  <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' onChange={textChange} value={text.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" name='password' onChange={textChange} value={text.password} className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-dark" onClick={log}>Submit</button>
</form>
  <div className='container' style={{display:'grid',justifyContent:'center'}}><button className='google.btn' onClick={googleAuth}><img src="./glogo.png" alt="G" style={{height:'50px'}}/><span>Sign in with Google</span></button></div>
   
  
    </>
  )
}
