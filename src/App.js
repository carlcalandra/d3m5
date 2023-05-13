import React, { useEffect, useState, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
//import data from "./data/fantasy.json"

import ThemeContext from "./context/ThemeContext";
import TokenContext from "./context/TokenContext";
import { themes } from "./context/ThemeContext";
import Home from "./pages/Home";
import PageDetails from "./pages/PageDetails";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-bootstrap";
import MyToast from "./components/MyToast";
import { nanoid } from "nanoid";
import ErrorContext from "./context/ErrorContext";

function App() {
  const addError = (error) => {
    return {
      error: error,
      errorId: nanoid(),
    };
  };
  const authenticationBody = {
    username: "carlocalandra@test.com",
    password: "Test",
  };
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastEls = errors.map((error) => (
    <MyToast
      key={error.errorId}
      title="Error"
      text={error.error.message}
      onClose={() => {
        setErrors((prev) => prev.filter((prevErr) => prevErr !== error));
      }}
    />
  ));
  const getToken = async () => {
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
      if (!response.ok) {
        throw Error(await response.text());
      } else {
        let data = await response.json();
        if (data.access_token !== "Invalid username / Password") {
          return data;
        } else {
          throw Error("Invalid username / Password");
        }
      }
    } catch (error) {
      setErrors(prev => [...prev, addError(error)])
    }
  };
  useEffect(() => {
    setLoading(true)
    getToken().then((response) => {
      setToken(response.access_token);
      setLoading(false);
    });
  }, []);
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        toggleTheme: () => {
          setTheme((prev) =>
            prev === themes.light ? themes.dark : themes.light
          );
        },
      }}
    >
      <TokenContext.Provider
        value={{
          token: token,
        }}
      >
        <ErrorContext.Provider
          value={{
            setErrors: (error) =>
              setErrors((prev) => [...prev, addError(error)]),
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/books/:asin" element={<PageDetails />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            containerPosition={"fixed"}
            position="bottom-end"
            className="p-3"
          >
            {toastEls}
          </ToastContainer>
        </ErrorContext.Provider>
      </TokenContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
