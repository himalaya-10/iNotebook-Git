import React, { useContext } from 'react'
import noteContext from '../context/noteContext'
// import axios from 'axios'
import { useEffect} from 'react';
export default function Enter() {

  // const [authtoken,setAuthtoken]=useState(null)
  // login success is run by axios feuture so its important 
// const getUser=async()=>{
//   try{
//     const response=await fetch(`auth/login/success`, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       credentials: "include",
//       });
//       const json= await response.json();
//       setAuthtoken(json.authtoken);
//       console.log(json.authtoken)
//   }
//   catch(err){
//     console.log(err)
//   }
// }
const context = useContext(noteContext)
const{getUser}=context;
useEffect(()=>{
  getUser();
  // eslint-disable-next-line
},[]);

  return (
    <div className='container'>
      {/* <button className='' onClick={googleSuccess}>Enter</button> */}
    </div>
  )
}
