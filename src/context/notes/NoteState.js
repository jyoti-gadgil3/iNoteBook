import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "67d7f4999486347d520b278a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    },
    {
      _id: "67d7f49994863475fd20b278a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: "New note",
      description: "complete the react course",
      tag: "work",
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    },
    {
      _id: "67d7f4999486347520b27sd8a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: "resume",
      description: "Start working on resume",
      tag: "work",
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    },
    {
      _id: "67d7f4999486347xc520b278a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: "Grocery",
      description: "Get patatoes from the market",
      tag: "personal",
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    },
    {
      _id: "67d7f49994863zsd47520b278a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    },
    {
      _id: "67d7f4999486347dfc520b278a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: "New note",
      description: "complete the react course",
      tag: "work",
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    },
    {
      _id: "67d7f499xc9486347520b278a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: "resume",
      description: "Start working on resume",
      tag: "work",
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    },
    {
      _id: "67d7f499948zxc6347520b278a4",
      user: "67cf29ea1f178e2bd81cb722",
      title: "Grocery",
      description: "Get patatoes from the market",
      tag: "personal",
      date: "2025-03-17T10:08:25.726Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  // Add a Note
  const addNote = (title, description, tag) => {
    // Todo: API call
    console.log("Adding a new note")
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
  const deleteNote = (id) => {
    // Todo: API call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=> {return note._id !== id})
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = (id, title, description, tag) => {

  }


  return <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
