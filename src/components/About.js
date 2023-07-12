
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
      <p style={{textAlign:"center"}}>iNotebook is your personalize cloud notebook which will always with you whereever you go. Access you Notebook everywhere!!  </p>
    </div>
  )
}
export default About
