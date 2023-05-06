import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ThemeContext from "../context/themeContext";

const SearchBar = ({ query, setQuery }) => {
  const {toggleTheme} = useContext(ThemeContext);
  return (
    <div className="d-flex align-items-center mb-2">
      <Button className="me-2" onClick={toggleTheme}>Change Theme</Button>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Filter your book"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchBar;
