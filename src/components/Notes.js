import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import NoteItems from './NoteItems'
import noteContext from '../context/noteContext'
export default function Notes() {
    const context = useContext(noteContext)
    const { notes, addNote,triggerAlert,fetchallNotes} = context
    //fetching all notes from db
    useEffect(()=>{
        fetchallNotes();
        triggerAlert("You are Logged In successfully!!")
        // eslint-disable-next-line
    },[])

    const [text,setText]=useState({title:"",tag:"",description:""})

    const textChange=(e)=>{
        setText({...text,[e.target.name]:e.target.value})
    }

    const onclickAdd=(e)=>{
        e.preventDefault()
        addNote(text);
        triggerAlert("Note added Successfully!!")
    }

    return (
        <>
            <div className='container'>
                <h1 style={{ textAlign: "center" }}>{ }-Notes</h1>
                <form>
                    <div className="mb-2">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={textChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tag" className="form-label" >Tag:</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={textChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description"  className="form-label" >Description:</label>
                        <textarea type="text" className="form-control" id="description" rows="3" name="description"  onChange={textChange}/>
                    </div>
                    <button type="submit" className="btn btn-success m-2" onClick={onclickAdd}><i className="fa-solid fa-plus">Add Note</i></button>
                </form>
            </div >
            <div className='row' style={{ textAlign: "center" }}>
                {
                    notes.map((note) => {
                        return <NoteItems key={note._id} note={note} />
                    })
                }
            </div>
        </>
    )
}
