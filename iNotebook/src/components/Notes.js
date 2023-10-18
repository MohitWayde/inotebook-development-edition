import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else{
            navigate("/");
        }
        //eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "Default" })



    const handleClick = (e) => {
        // console.log("Updating the note... ", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Note Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    const updateNote = (currentNote) => {
        // console.log("Into updateNote()");
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            {/* Modal started*/}

            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter the Title" onChange={onChange} value={note.etitle} minLength={5} required
                                        
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter the Description" onChange={onChange} value={note.edescription} minLength={5} required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter the tag" onChange={onChange} value={note.etag} 
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button disabled={note.etitle.length<5 || note.edescription.length <5} ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Ended*/}

            <div className="my-3">
                <h3>Your Notes</h3>
                <div className="container">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                <div className="row my-3">
                    {notes.map((note) => {
                        return (
                            <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Notes;
