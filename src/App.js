import React, { useEffect, useState } from "react";
import "./App.css";
//import data from "./data/fantasy.json"
import BookList from "./Components/BookList";
import SearchBar from "./Components/SearchBar";
import { Container, Row, Col } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
import ThemeContext from "./context/themeContext";
import { themes } from "./context/themeContext";
import { CommentArea } from "./Components/CommentAreaNoModal";

const authenticationBody = {
  username: "carlocalandra@test.com",
  password: "Test",
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: themes.light,
      books: [],
      loading: false,
      query: "",
      error: null,
      token: "",
    };
  }

  changeState = (key, value) => {
    this.setState((prev) => ({ ...prev, [key]: value }));
  };
  getToken = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authenticationBody),
        }
      );
      return await response.json();
    } catch (error) {
      this.changeState("error", error.message);
    }
  };
  getBooks = async () => {
    try {
      const response = await fetch("https://epibooks.onrender.com/");
      return await response.json();
    } catch (error) {
      this.changeState("error", error.message);
    }
  };

  async componentDidMount() {
    this.changeState("loading", true);
    const token = (await this.getToken()).access_token;
    console.log(token);
    this.changeState("token", token);
    console.log(this.state.token);
    const books = await this.getBooks();
    this.changeState("books", books);
    this.changeState("books", books);
    this.changeState("loading", false);
  }
  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          toggleTheme: () => {
            console.log("clicked");
            this.changeState(
              "theme",
              this.state.theme === themes.light ? themes.dark : themes.light
            );
          },
        }}
      >
        <div className="py-2 px-4">
          {this.state.loading && !this.state.error && (
            <div className="d-flex justify-content-center vh-100 v-100 align-items-center">
              <PacmanLoader color="#36d7b7" size={50} />
            </div>
          )}
          {!this.state.loading && !this.state.error && (
            <Container fluid>
              <SearchBar
                query={this.state.query}
                setQuery={(value) => this.changeState("query", value)}
              />
              <BookList
                query={this.state.query}
                books={this.state.books}
                token={this.state.token}
                setError={(value) => this.changeState("error", value)}
              />
            </Container>
          )}
          {this.state.error && <p>{this.state.error}</p>}
        </div>
      </ThemeContext.Provider>
    );
  }
}

// function App() {
//   const [books, setBooks] = useState([]);
//   const [books, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [token, setToken] = useState("");
//   const getToken = async () => {
//     try {
//       const response = await fetch("https://striveschool-api.herokuapp.com/api/account/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body:JSON.stringify(authenticationBody)
//       });
//       return await response.json();
//     } catch (error) {
//       setError(error.message);
//     }
//   };
//   const getBooks = async () => {
//     try {
//       const response = await fetch("https://epibooks.onrender.com/");
//       return await response.json();
//     } catch (error) {
//       setError(error.message);
//     }
//   };
//   useEffect(() => {
//     setLoading(true);
//     getToken().then(response => setToken(response.access_token));
//     getBooks().then((books) => {
//       setBooks(books);
//       setFilteredBooks(books);
//       setLoading(false);
//     });
//   }, []);
//   return (
//     <div className="py-2">
//       <Container>
//         {loading && !error && (
//           <div className="d-flex justify-content-center vh-100 v-100 align-items-center">
//             <PacmanLoader color="#36d7b7" size={50} />
//           </div>
//         )}
//         {!loading && !error && (
//           <SearchBar data={books} setFilteredData={setFilteredBooks} />
//         )}
//         {!loading && !error && <BookList books={books} token={token} setError={setError}/>}
//         {error && <p>{error}</p>}
//       </Container>
//     </div>
//   );
// }

export default App;
