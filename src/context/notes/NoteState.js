import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjZjI5ZWExZjE3OGUyYmQ4MWNiNzIyIn0sImlhdCI6MTc0MTYzMTg4N30.Hl7DrDOwG6HNfHiwH1A1UZKSlOVutuLwHPyF9CyxW_M"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
    
  }




  // Add a Note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjZjI5ZWExZjE3OGUyYmQ4MWNiNzIyIn0sImlhdCI6MTc0MTYzMTg4N30.Hl7DrDOwG6HNfHiwH1A1UZKSlOVutuLwHPyF9CyxW_M"
      },
      body: JSON.stringify({title, description, tag})
    });
    console.log("Adding a new note")

    // Logic to add in client
    let note = {
      _id: "67d7f4999rr4447520b278a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: title,
      description: description,
      tag: tag,
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    };
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    

    // Logic to delete in client
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=> {return note._id !== id})
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjZjI5ZWExZjE3OGUyYmQ4MWNiNzIyIn0sImlhdCI6MTc0MTYzMTg4N30.Hl7DrDOwG6HNfHiwH1A1UZKSlOVutuLwHPyF9CyxW_M"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        element.title = title;
        element.description = description;
        element.tag = tag
      }
    }
  }


  return <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
