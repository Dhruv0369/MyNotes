import React, { useState } from "react"
import NoteContext from "./noteContext"
import { json } from "react-router-dom"

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get All Note
  const getNotes = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GEt',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMzE3NTllOGIxMDU4NTA3MDhkNTg3In0sImlhdCI6MTcyMzAyMTM1NH0.7qBWS--lCNuxgyYaSrDHdKS0w8yS8GEJKxQtPhyu42c'
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)

  }

  // delete a Note
  const deleteNote = (id) => {
    // TODO API call

    console.log("Deleting the note with id " + id)

    // this two line a delete a note
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
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
    <NoteContext.Provider value={{ notes, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;