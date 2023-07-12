import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext';



export default function NoteItems(props) {
  //import context
  let context=useContext(noteContext);
  let {deleteNote,editNote,triggerAlert}=context

  //taking one by one note from notesarray
  let { note } = props

  //setting flag for editing purpose
  let [flag,setFlag]=useState(0)

  //destructuring note
  let {title,description,tag}=note

  //for changing the text //updating
  const [text,setText]=useState({title:title,tag:tag,description:description})
  // //to reload page
  // const refresh = () => window.location.reload(true)
  //using to call editnote.
  const updateNote=(e)=>{
    editNote(note._id,text);
    triggerAlert("Note updated successfully!!!")

  }
  //for updating text.
  const textChange=(e)=>{
    setText({...text,[e.target.name]:e.target.value})
  }


  //toggling purpose
  const toggleFlag=()=>{
    if(flag===0){
      setFlag(1);
    }
    else{

      setFlag(0);
    }
  }
  
  return (
    
    <div className='col-md-3'>
      <div className="card">
        <div className="card-body">
          {flag===0?
          <h5 className="card-title">{note.title}</h5>
          :
          <div><input type="text" className="form-control m-1" id="title" name='title' placeholder='Title' value={text.title} onChange={textChange}/></div>
         }
         {flag===0?
        <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
        :
        <input type="text" className="form-control m-1" id="tag" name='tag' value={text.tag} onChange={textChange}/>
         }
         {flag===0?
         <p className="card-text">{note.description}</p>
         :
         <textarea type="text" className="form-control m-1" id="description" rows="1" name="description" placeholder='Description' value={text.description} onChange={textChange}/>
        }
          <div className="d-flex justify-content-between">
          {flag===0?
            <i className="fa-solid fa-pen-to-square" style={{color: "#000000"}} onClick={toggleFlag}></i>
            :
            <i className="fa-regular fa-circle-xmark" style={{color: "#000000"}} onClick={toggleFlag}></i>
          }
            {/* onclickenventhandler can also be done by below syntax bcz giving arguments to delete note*/}
            {flag===0?
            <i className="fa-solid fa-trash " style={{color: "#000000"}} onClick={()=>{deleteNote(note._id);triggerAlert("Note deleted successfully!!!")}}></i>
            :
            <i className="fa-solid fa-check" style={{color: "#000000"}} onClick={()=>{toggleFlag();updateNote();}}></i>
}
          </div>
        </div>
      </div>
    </div>
  )
}
