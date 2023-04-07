import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../Styles/allbooks.css";
import axios from "axios";

export const Allbooks = () => {
  const [booksInfo, setBookInfo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("http://localhost:8080/books/allbooks");
      setBookInfo(response.data);
    };
    loadData();
  }, []);

  if (booksInfo === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booksinfo">
      <h1>List of All Books</h1>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read or not</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(booksInfo) &&
            booksInfo.map((book) => (
              <tr key={book.isbn}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
                <td>
                  {book.completed === true || book.completed === "true"
                    ? "Yes"
                    : "No"}
                </td>
                <td>{book.notes}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allbooks;
