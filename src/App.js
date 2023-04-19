import { useEffect, useState } from 'react';
import './App.css';
//import data from "./data/fantasy.json"
import BookList from './Components/BookList';
import SearchBar from './Components/SearchBar';
import { Container } from 'react-bootstrap';
import {PacmanLoader} from "react-spinners"

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getBooks = async () => {
    try {
      const response = await fetch("https://epibooks.onrender.com/");
      return await response.json()
    } catch(error) {
      setError(error.message)
    }

  }
  useEffect(() => {
    setLoading(true);
    getBooks()
      .then(books => {
        setBooks(books);
        setFilteredBooks(books);
        setLoading(false);
      });
  },[])
  return (
    <div className='py-2'>
      <Container>
        {loading && !error && <div className='d-flex justify-content-center vh-100 v-100 align-items-center'><PacmanLoader color="#36d7b7" /></div>}
        {!loading && !error && <SearchBar data={books} setFilteredData={setFilteredBooks}/>}
        {!loading && !error && <BookList books={filteredBooks}/>}
        {error && <p>{error}</p>}
      </Container>
    </div>
  );
}

export default App;
