import React, { useState } from "react";

import "../Styles/updatebook.css";

export const Updatebook = () => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [completed, setCompleted] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateBook = (event) => {
    event.preventDefault();

    const book = { title, author, pages, completed, notes };
    if(completed === " "){
      setMessage("This field is Mandatory");
    }
    
    fetch(`http://localhost:8080/books/updateBook/${isbn}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Book Updated Successfully.");
        } else {
          setMessage("Failed to Update Book.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="updatebook-container">
      <div className="updatebook-heading">Enter Details to update a book</div>
      <form onSubmit={handleUpdateBook}>
        <div className="updatebook-form-row">
          <label> ISBN: </label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
        </div>

        <div className="updatebook-form-row">
          <label> Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="updatebook-form-row">
          <label> Author:  </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
        </div>

        <div className="updatebook-form-row">
          <label> Pages: </label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
        </div>

        <div className="updatebook-form-row">
          <label> Completed:  </label>
            <select className="updatebook-option-val"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
              required
            >
              <option value="">--Select--</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
        </div>

        <div className="updatebook-form-row">
          <label> Notes: </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
        </div>

        <button className="addbook-submit-btn" type="submit">
          Update Book
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Updatebook;
