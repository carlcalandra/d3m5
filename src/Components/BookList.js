import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import SingleCard from "./SingleCard";

const BookList = ({ query, books, token }) => {
  const [selected, setSelected] = useState(false);
  const cards = books
    .filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    .map((book) => (
      <Col key={book.asin}>
        <SingleCard
          book={book}
          token={token}
          selected={selected === book.asin}
          setSelected={setSelected}
        ></SingleCard>
      </Col>
    ));
  return (
    <Row xs={1} md={2} lg={3} className="g-3 mb-3">
      {cards}
    </Row>
  );
};

export default BookList;
