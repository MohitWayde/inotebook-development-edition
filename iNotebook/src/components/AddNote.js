import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";


const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title:"", description :"", tag:""})

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description :"", tag:""})
    props.showAlert("Note added Successfully", "success");
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
	<div>
	   <div className="container my-3">
        <h3>Add a Note</h3>
        <form>
          <div className= "form-group">
            <label htmlFor= "title">Title</label>
            <input
              type="text"
              className= "form-control"
              id="title"
              name="title"
              placeholder="Enter the Title"
              onChange={onChange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className= "form-group">
            <label htmlFor= "description">Description</label>
            <input
              type="text"
              className= "form-control"
              id="description"
              name ="description"
              placeholder="Enter the Description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className= "form-group">
            <label htmlFor= "tag">Tag</label>
            <input
              type="text"
              className= "form-control"
              id="tag"
              name ="tag"
              placeholder="Enter the tag"
              onChange={onChange}
              value={note.tag}
              
            />
          </div>
          <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className= "btn btn-primary"onClick={handleClick}>
            Add Note
          </button>
        </form>
        
      </div>
	</div>
  )
}

export default AddNote;
