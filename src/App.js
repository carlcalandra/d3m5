import { useEffect, useState } from "react";
import "./App.css";
//import data from "./data/fantasy.json"
import BookList from "./Components/BookList";
import SearchBar from "./Components/SearchBar";
import { Container } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";

const authenticationBody = {
  username:"carlocalandra@test.com",
  password:"Test"
}

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const getToken = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(authenticationBody)
      });
      return await response.json();
    } catch (error) {
      setError(error.message);
    }
  };
  const getBooks = async () => {
    try {
      const response = await fetch("https://epibooks.onrender.com/");
      return await response.json();
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    setLoading(true);
    getToken().then(response => setToken(response.access_token));
    getBooks().then((books) => {
      setBooks(books);
      setFilteredBooks(books);
      setLoading(false);
    });
  }, []);
  return (
    <div className="py-2">
      <Container>
        {loading && !error && (
          <div className="d-flex justify-content-center vh-100 v-100 align-items-center">
            <PacmanLoader color="#36d7b7" size={50} />
          </div>
        )}
        {!loading && !error && (
          <SearchBar data={books} setFilteredData={setFilteredBooks} />
        )}
        {!loading && !error && <BookList books={filteredBooks} token={token} setError={setError}/>}
        {error && <p>{error}</p>}
      </Container>
    </div>
  );
}

export default App;
