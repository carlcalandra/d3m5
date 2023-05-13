import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import ThemeContext from "../context/ThemeContext";

const SearchBar = ({ query, setQuery }) => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <Row xs={2}>
      <Col>
        <Form>
          <Row>
            <Col xs={3} className="text-center">
              <Button className="me-2" onClick={toggleTheme}>
                Change Theme
              </Button>
            </Col>
            <Col xs={9}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Filter your book"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchBar;
