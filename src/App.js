import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import View from "./component/view";

const getDataFromLS = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [books, setBooks] = useState(getDataFromLS());

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleAddSubmit = (e) => {
    e.preventDefault();

    let book = {
      title,
      author,
      isbn,
    };
    setBooks([...books, book]);
    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  const deleteBook = (isbn) => {
    const filteredBooks = books.filter((element, index) => {
      return element.isbn !== isbn;
    });
    setBooks(filteredBooks);
  };

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);
  return (
    <div className="wrapper">
      <h1>Booklist App</h1>
      <p>Add and view your books using local storage</p>
      <div className="main">
        <div className="form-container">
          <form
            onSubmit={handleAddSubmit}
            autoComplete="off"
            className="form-group"
          >
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
            <br></br>
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            ></input>
            <br></br>
            <label>ISBN#</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
            ></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              Add
            </button>
          </form>
        </div>
        <div className="view-container">
          {books.length > 0 && (
            <>
              <div className="table-respsonsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ISBN#</th>
                      <th>title</th>
                      <th>author</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View books={books} deleteBook={deleteBook} />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={() => setBooks([])}
              >
                Remove All
              </button>
            </>
          )}
          {books.length < 1 && <div>No books are added yet</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
