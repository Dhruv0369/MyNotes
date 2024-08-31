import React, { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
  const notesInitial = [

    {
      "_id": "66c6d386916e2b2dcycffdd09",
      "user": "66b31759e8b105850708d587",
      "title": "My Tite",
      "description": "Please Wake Up Early",
      "tag": "Personal",
      "date": "2024-08-22T05:58:30.073Z",
      "__v": 0
    },
    {
      "_id": "66c6d358916e2b2dtccffdd07",
      "user": "66b31759e8b105850708d587",
      "title": "My Tite",
      "description": "Please Wake Up Early",
      "tag": "Personal",
      "date": "2024-08-22T05:57:44.300Z",
      "__v": 0
    },
    {
      "_id": "66c6d386916e2b2dcciffdd09",
      "user": "66b31759e8b105850708d587",
      "title": "My Tite",
      "description": "Please Wake Up Early",
      "tag": "Personal",
      "date": "2024-08-22T05:58:30.073Z",
      "__v": 0
    },
    {
      "_id": "66c6d358916e2br2dccffdd07",
      "user": "66b31759e8b105850708d587",
      "title": "My Tite",
      "description": "Please Wake Up Early",
      "tag": "Personal",
      "date": "2024-08-22T05:57:44.300Z",
      "__v": 0
    },
    {
      "_id": "66c6d386916e2b2dccfnfdd09",
      "user": "66b31759e8b105850708d587",
      "title": "My Tite",
      "description": "Please Wake Up Early",
      "tag": "Personal",
      "date": "2024-08-22T05:58:30.073Z",
      "__v": 0
    },
    {
      "_id": "66c6d358916ef2b2dccffdd07",
      "user": "66b31759e8b105850708d587",
      "title": "My Tite",
      "description": "Please Wake Up Early",
      "tag": "Personal",
      "date": "2024-08-22T05:57:44.300Z",
      "__v": 0
    },
    {
      "_id": "66c6d386916e2b2dc4cffdd09",
      "user": "66b31759e8b105850708d587",
      "title": "My Tite",
      "description": "Please Wake Up Early",
      "tag": "Personal",
      "date": "2024-08-22T05:58:30.073Z",
      "__v": 0
    },
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = (title, description, tag) => {
    // TODO API call
    console.log("Adding a new note");


    const note = {
      "_id": "66c6d386916e2b2dc4cffdd0s9",
      "user": "66b31759e8b105850708d587",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-08-22T05:58:30.073Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // delete a Note
  const deleteNote = () => {

  }

  // Edit a Note
  const editNote = () => {

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;