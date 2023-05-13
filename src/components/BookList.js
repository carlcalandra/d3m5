import { Row, Col, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import SingleCard from "./SingleCard";
import { CommentArea } from "./CommentAreaNoModal";

const BookList = ({ query, books}) => {
  const [selected, setSelected] = useState(null);
  const cards = books
    .filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    .map((book) => (
      <Col key={book.asin}>
        <SingleCard
          book={book}
          selected={selected === book}
          setSelected={setSelected}
        ></SingleCard>
      </Col>
    ));
  return (
    <div className="mt-4">
      <Row
        xs={2}
      >
        <Col>
          <Row xs={1} md={2} lg={3} className="g-3">
            {cards}
          </Row>
        </Col>
        <Col>
          {selected && (
            <CommentArea book={selected}/>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BookList;
