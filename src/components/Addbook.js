import React, { useState } from "react";
import "../Styles/addbooks.css";

export const Addbook = () => {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    author: "",
    pages: "",
    completed: false,
    notes: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setBook({
      ...book,
      [name]: value,
    });
  };

  const validateIsbn = (input) => {
    // ISBN must be numeric, 13 digits long, start with 9, and have a valid weighted sum checksum
    const isbnRegex = /^9\d{12}$/;
    if (!isbnRegex.test(input)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(input[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const checksum = (10 - (sum % 10)) % 10;
    return parseInt(input[12]) === checksum;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate ISBN before submitting form
    if (!validateIsbn(book.isbn)) {
      setErrorMessage(
        "Invalid ISBN. Please enter a valid ISBN starting with 9 and have a valid weighted sum checksum"
      );
      setMessage(null);
      return;
    }

    // Check if ISBN is already present in the db
    fetch(`http://localhost:8080/books/checkISBN/${book.isbn}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          setErrorMessage(
            "Book with the same ISBN already exists in the database"
          );
          setMessage(null);
        } else {
          // If ISBN is not present, then adding book to db
          fetch("http://localhost:8080/books/addbook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
          })
            .then((response) => {
              if (response.ok) {
                setErrorMessage(null);
                setMessage("Book added successfully");
              } else {
                setErrorMessage("Failed to add the book");
                setMessage(null);
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addbook-container">
      <div className="addbook-heading">Enter Details to add a book</div>
      <form onSubmit={handleSubmit}>
        <div className="addbook-form-row">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            name="isbn"
            id="isbn"
            value={book.isbn}
            onChange={handleInputChange}
          />
        </div>

        <div className="addbook-form-row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={book.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="addbook-form-row">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            value={book.author}
            onChange={handleInputChange}
          />
        </div>

        <div className="addbook-form-row">
          <label htmlFor="pages">Pages:</label>
          <input
            type="number"
            name="pages"
            id="pages"
            value={book.pages}
            onChange={handleInputChange}
          />
        </div>

        <div className="addbook-form-row">
          <label htmlFor="completed">Completed:</label>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={book.completed}
            onChange={handleInputChange}
          />
        </div>

        <div className="addbook-form-row">
          <label htmlFor="notes">Notes:</label>
          <textarea
            name="notes"
            id="notes"
            value={book.notes}
            onChange={handleInputChange}
          />
        </div>

        <button className="addbook-submit-btn" type="submit">
          Add Book
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

