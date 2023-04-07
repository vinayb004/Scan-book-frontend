import React from "react";
import "../Styles/searchbook.css";
import { useState } from "react";

export const Searchbook = () => {
  const [isbn, setIsbn] = useState("");
  const [bookInfo, setBookInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      // Validation of ISBN format
      const isbnPattern = /^[9]\d{12}$/;
      if (!isbnPattern.test(isbn)) {
        setBookInfo(null);
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
        setBookInfo(null);
        setErrorMessage("Invalid ISBN. Checksum mismatch.");
        return;
      }
      let isDbOk = true;
      let bookExists;
      try {
        const dbResponse = await fetch(
          `http://localhost:8080/books/checkISBN/${isbn}`
        );
        bookExists = await dbResponse.json();
        console.log(bookExists);
      } catch (error) {
        isDbOk = false;
      }
      

      if (bookExists?.exists === true) {
        // If the book exists in the database, return the stored information
        const response = await fetch(
          `http://localhost:8080/books/book/${isbn}`
        );
        if (response.ok) {
          const bookInfo = await response.json();
          setBookInfo(bookInfo);
          alert("ISBN found in db retriving it.")
          setErrorMessage(null);
        } else {
          setBookInfo(null);
          setErrorMessage("Error retrieving book from database.");
        }
      }
      else if (bookExists?.exists === false || isDbOk === false){
        // If the book does not exist in the database, look it up using the Google Books API
        const googleResponse = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        );
        if (googleResponse.ok) {
          const data = await googleResponse.json();
          if (data.totalItems === 0) {
            setBookInfo(null);
            setErrorMessage("Book not found.");
          } else {
            const bookData = data.items[0].volumeInfo;
            const bookInfo = {
              isbn: isbn,
              title: bookData.title,
              author: bookData.authors?.join(", "),
              pages: bookData.pageCount,
              completed: false,
              notes: "",
            };
            setBookInfo(bookInfo);
            setErrorMessage(null);
            alert("ISBN not found in db. Fetching it from google api.");
            const saveResponse = await fetch(
              `http://localhost:8080/books/addbook`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bookInfo),
              }
            );
            if (!saveResponse.ok) {
              setErrorMessage("Error saving book information to database.");
            }
          }
        } else {
          setBookInfo(null);
          setErrorMessage("Error searching for book.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleIsbnChange = (event) => {
    setIsbn(event.target.value);
  };

  return (
    <div className="search-book">
      <h1>Search a book</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="isbn">Enter ISBN:</label>
        <input type="text" id="isbn" value={isbn} onChange={handleIsbnChange} />
        <button type="submit">Search</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {bookInfo && (
        <div className="book-info">
          <div className="book-info-line">
            <h2>ISBN:</h2>
            <p>{bookInfo.isbn}</p>
          </div>
          <div className="book-info-line">
            <h2>Book Title:</h2>
            <p>{bookInfo.title}</p>
          </div>
          <div className="book-info-line">
            <h2>Author:</h2>
            <p>{bookInfo.author}</p>
          </div>
          <div className="book-info-line">
            <h2>Pages:</h2>
            <p>{bookInfo.pages}</p>
          </div>
          <div className="book-info-line">
            <h2>Read or Not:</h2>
            <p>
              {bookInfo.completed === true || bookInfo.completed === "true"
                ? "Yes"
                : "No"}
            </p>
          </div>
          <div className="book-info-line">
            <h2>Notes:</h2>
            <p>{bookInfo.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbook;
