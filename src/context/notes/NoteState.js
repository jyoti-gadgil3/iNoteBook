import { useState } from "react";
import NoteContext from "./noteContext";

const notesInitial = [
    {
      "_id": "67d7f4999486347520b278a4",
      "user": "67cf29ea1f178e2bd81cb722",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2025-03-17T10:08:25.726Z",
      "__v": 0
    }
  ]


const NoteState = (props) => {
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;