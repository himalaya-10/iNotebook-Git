
// import React, {useContext, useEffect} from 'react'
// import NoteContext from '../context/noteContext'

const About=()=> {


    // const a = useContext(NoteContext)
    // useEffect(()=>{
    //   a.update();
    //   // eslint-disable-next-line
    // },[])
  return (
    <div className="container" >
      {/* this is about in {a.state.name} in class {a.state.class} */}

      <h1 style={{textAlign:"center"}}>About iNotebook</h1>
      <p style={{textAlign:"center"}}>iNotebook is your personalised cloud notebook which will always be with you wherever you go. Access your Notebook anywhere!</p>
    </div>
  )
}
export default About
