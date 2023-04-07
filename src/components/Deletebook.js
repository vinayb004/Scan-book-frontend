import React, { useState } from "react";
import "../Styles/deletebook.css";

export const Deletebook = () => {
  const [message, setMessage] = useState(null);
  const [isbn, setIsbn] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const deleteBook = async () => {
    try {
      // Validation of ISBN format
      const isbnPattern = /^[9]\d{12}$/;
      if (!isbnPattern.test(isbn)) {
        setErrorMessage(
          "Invalid ISBN. It should be numeric, 13 digits long, start with 9, and have a valid checksum."
        );
        return;
      }
      // Calculate weighted sum checksum
      let weightedSum = 0;
      for (let i = 0; i < 12; i++) {
        weightedSum += parseInt(isbn.charAt(i)) * (i % 2 === 0 ? 1 : 3);
      }
      const checksum = (10 - (weightedSum % 10)) % 10;

      // Check if calculated checksum matches the last digit of ISBN
      if (checksum !== parseInt(isbn.charAt(12))) {
        setErrorMessage("Invalid ISBN. Checksum mismatch.");
        return;
      }

      const response = await fetch(`http://localhost:8080/books/book/${isbn}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Book Deleted Successfully.");
      } else {
        setMessage("Failed to Delete Book");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-book">
      <h1>Delete a book</h1>
      {/* <div className="delete-book"> */}
      <label htmlFor="isbn">Enter ISBN:</label>
      <input
        type="text"
        value={isbn}
        onChange={(event) => setIsbn(event.target.value)}
      />
      {/* </div> */}
      <button onClick={deleteBook}>Delete Book</button>
      {message && <div className="message">{message}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Deletebook;
