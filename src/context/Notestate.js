import { useNavigate } from "react-router-dom";
import NoteContext from "./noteContext"
import { useState } from "react"
import Alert from '../components/Alert';
const Notestate = (props) => {
   const host="http://localhost:8000/"
    const notesInitial=[]

    const fetchallNotes=async()=>{
        //Api fetch
    const response = await fetch(`${host}api/getNotes`, {
        method: "GET",
        headers: {
          "auth-token":localStorage.getItem('token'),

        },
        body: JSON.stringify()
      });
      
      const json= await response.json();
      setNotes(json)
      
    }


        //for updating Notes
        const [notes,setNotes]=useState(notesInitial)
        
        //add note
        const addNote=async({title,tag,description})=>{
            // console.log(title,tag,description)
            //Api fetch
        const response = await fetch(`http://localhost:8000/api/createNotes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          const json= await response.json();
        //   console.log(json)



          //addnote
          const note=json
          
            setNotes(notes.concat(note))
        }

        //delete note

        const deleteNote=async(id)=>{
            //Api Call
            // const response =
             await fetch(`${host}api/deleteNotes/${id}`, {
                method: "DELETE",
                headers: {
                  "auth-token":localStorage.getItem('token'),
                  

                },
                body: JSON.stringify()
              });
            //   const json= await response.json();
              
            // console.log(id)
            const newnotes=notes.filter((note)=>{
                return note._id!==id;
            })
            setNotes(newnotes)

        }

        //edit Note
        const editNote=async(id,{title,description,tag})=>{
                // console.log(id,title,description,tag)
            //fetch Api
                // const response = 

                await fetch(`${host}api/updateNotes/${id}`, {
                  method: "PUT",
                  headers: {
                "auth-token":localStorage.getItem('token'),
                    "Content-Type": "application/json",

                  },
                  body: JSON.stringify({title,description,tag})
                });
                // const json= await response.json();
                
            //updating
            let newNotes=JSON.parse(JSON.stringify(notes))//we cannot change normally in react {need to refresh thats. y making copy}
            for(let index=0;index<newNotes.length;index++){
                const element=newNotes[index]
                if(element._id===id){
                    newNotes[index].title=title;
                    newNotes[index].tag=tag;
                    newNotes[index].description=description
                    break;
                }
                
            }
            setNotes(newNotes);
            
        }


        //signning in
        const signup=async(name,email,password)=>{
            
        //fetch Api
            // const response = 
            
            let response=await fetch(`${host}api/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password})
            });
            
            const json= await response.json();
            if(json.userexist){
                triggerAlert("User Already Exists!!!")
            }
            else{
                triggerAlert("You have signed in successfully!!!")
            }
        
        }





        //loggin
        let navigate=useNavigate();
        const login=async({email,password})=>{

            //fetch Api
                // const response = 

                const response=await fetch(`${host}api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,password})
                });
                const json= await response.json();
                // console.log(json)
                if(json.success){
                   localStorage.setItem('token',json.authtoken)
                    navigate("logged")
                }
                else{
                    triggerAlert("XXXXXX Invalid Credentials XXXXXX")
                }
            
        }
        //getuser//googlelogin
        const getUser=async()=>{
            try{
              const response=await fetch(`${host}auth/login/success`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                });
                const json= await response.json();
                localStorage.setItem('token',json.authtoken)
                // console.log(json.authtoken)
                navigate("logged")
                
            }
            catch(err){
              console.log(err)
            }
          }


        //googlelogin

        
        // const googlelogin=async(authtoken)=>{

        //     //fetch Api
        //         // const response = 

                
                
        //         // if(json.success){
        //            localStorage.setItem('token',authtoken)
        //             navigate("logged")
        //         // }
        //         // else{
        //         //     triggerAlert("XXXXXX Invalid Credentials XXXXXX")
        //         // }
            
        // }

        let [msg,setmsg]=useState(null)

        

        const triggerAlert=(msg)=>{
            // console.log(msg)
            setmsg(msg)
            setTimeout(() => {
                setmsg(null)
            }, 1500);

        }
    return(
        <NoteContext.Provider value={{notes,setNotes,triggerAlert,addNote,deleteNote,editNote,fetchallNotes,signup,login,getUser}}>

            <Alert msg={msg} />
            { props.children }
        </NoteContext.Provider >
    )
}
export default Notestate;



 //for understanding constext
    // const s1 = {
    //     "name": "Himalaya",
        
    //     "class": "10"
    // }
    // const [state,setstate]= useState(s1)
    // const update=()=>{
    // setTimeout(() => {
    //     setstate( {
    //         "name": "jimalaya",
            
    //         "class": "40"
    //     })
    // }, 1000);