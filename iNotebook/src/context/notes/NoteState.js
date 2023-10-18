import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    // TODO
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Add a note - CREATE
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const note = await response.json();
        console.log("addNote() is running properly ",note);

        // Logic for adding note on client side
        setNotes(notes.concat(note));
    };

    // Get all notes - READ
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        }
        );
        const jsonData = await response.json();
        // console.log("NoteState");
        setNotes(jsonData)
    };

    // Update/Edit a note - UPDATE
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const jsonData = await response.json();
        console.log("editNote() is running properly ",jsonData);

        //  Logic to edit in client side
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
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


    // Delete a note - DELETE
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        }
        );
        const jsonData = await response.json();
        console.log("deleteNote() is running properly ",jsonData);

        console.log("Id of the deleted note is " + id);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
