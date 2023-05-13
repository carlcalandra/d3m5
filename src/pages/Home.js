import BookList from "../components/BookList";
import React, { useEffect, useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import { Container } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
import MyCarousel from "../components/MyCarousel";
import ThemeContext from "../context/ThemeContext";
import ErrorContext from "../context/ErrorContext";
import TokenContext from "../context/TokenContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const {setErrors} = useContext(ErrorContext);
  const {token} = useContext(TokenContext);
  const getBooks = async () => {
    try {
      const response = await fetch("https://epibooks.onrender.com/");
      return await response.json();
    } catch (error) {
      setErrors(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getBooks().then((books) => {
      setBooks(books);
      setLoading(false);
    });
  }, []);
  return (
    <Container
      fluid
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      <div className="py-2">
        {(loading || token.length === 0) && (
          <div className="d-flex justify-content-center vh-100 v-100 align-items-center">
            <PacmanLoader color="#36d7b7" size={50} />
          </div>
        )}
        {!loading  && token.length >0 &&
        <main>
            <MyCarousel books={books} />
            <SearchBar data={books} query={query} setQuery={setQuery} />
            <BookList
              books={books}
              query={query}
            />
        </main>}
      </div>
    </Container>
  );
};

export default Home;
