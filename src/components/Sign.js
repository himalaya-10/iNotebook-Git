import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'

export default function Sign() {
  const context = useContext(noteContext)
  const {signup,triggerAlert} = context
  
  const [text,setText]=useState({name:"",email:"",password:"",cpassword:""})

  const sign=(e)=>{
    e.preventDefault();
    if(text.password!==text.cpassword){
      triggerAlert("XXXX Passwords do NOT match XXXX")
    }
    else{
    
      signup(text.name,text.email,text.password);
    
    }
  }

  const textChange=(e)=>{
    setText({...text,[e.target.name]:e.target.value})
}

  return (
    <>
    <div className='login m-5' style={{ textAlign: "center" }}>
      <h1>Sign in to create Your cloud Notebook</h1>
      </div>
  <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="name" name='name' value={text.name} className="form-control" id="Name" aria-describedby="emailHelp" onChange={textChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"  name="email" value={text.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={textChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" name='password' value={text.password}  className="form-control" id="exampleInputPassword1" onChange={textChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Confirm Password</label>
    <input type="password" name='cpassword' value={text.cpassword}  className="form-control" id="exampleInputPassword2" onChange={textChange}/>
  </div>
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-dark" onClick={sign}>Sign Up</button>
</form>

   
  
    </>
  )
}
