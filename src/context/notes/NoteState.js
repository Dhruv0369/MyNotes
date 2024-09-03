import NoteContext from "./noteContext";
import { useState } from "react";
import { toast } from 'sonner';


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



  ///////////////////////////////////////////////////////////////////////////////////////   Get All Note   /////////////////////////////////////////////////////////////////////////////////////



  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c"
      }
    });
    const json = await response.json()
    setNotes(json)
  }


  ///////////////////////////////////////////////////////////////////////////////////////    Add a Note  ///////////////////////////////////////////////////////////////////////////////////////



  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c"
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }


  ///////////////////////////////////////////////////////////////////////////////////////    Delete a Note  ////////////////////////////////////////////////////////////////////////////////////



  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c"
        }
    });

    const json = await response.json(); // Await the json response
    console.log(json);

    // Check if the deletion was successful (e.g., check if the API responds with a success message)
    if (response.ok) {
        // Show success toast
        // toast.success('Successfully Deleted Note!');

        // Update the state to remove the deleted note
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    } else {
        // If there is an error, handle it (optional)
        toast.error('Failed to delete note!');
    }
};



  ///////////////////////////////////////////////////////////////////////////////////////    Edit a Note   //////////////////////////////////////////////////////////////////////////////////////



  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)


    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;