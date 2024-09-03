import React, { useState } from "react"
import NoteContext from "./noteContext"
// import { json } from "react-router-dom"

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)




  /////////////////////////////////////////////////////////////////   Get All Note   /////////////////////////////////////////////////////////////////



  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c'
      },
    });
    // console.log(response);
    const json = await response.json();
    setNotes(json)

  }


  ///////////////////////////////////////////////////////////////////// Add a Note  /////////////////////////////////////////////////////////////



  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const addNote = async (title, description, tag) => {
      // Ensure title, description, and tag are properly validated in the backend
      if (!title || !description || !tag) {
          console.log("Validation error: Missing required fields.");
          return;
      }
  
      // Proceed with the request
      const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c"
          },
          body: JSON.stringify({ title, description, tag })
      });
      const json = response.json();
      console.log(json)
  }

    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8SDca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }



  ///////////////////////////////////////////////////////////////////// Delete a Note  /////////////////////////////////////////////////////////////



  const deleteNote = async (id) => {
    // TODO API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c'
      },
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting the note with id " + id)

    // this two line a delete a note
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }




  ///////////////////////////////////////////////////////////////////// Update a Note  /////////////////////////////////////////////////////////////


  
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json)

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, deleteNote, addNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;