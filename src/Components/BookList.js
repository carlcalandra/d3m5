import { Row, Col, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import SingleCard from "./SingleCard";
import { CommentArea } from "./CommentAreaNoModal";
import ThemeContext from "../context/themeContext";

const BookList = ({ query, books, token, setError }) => {
  const { theme } = useContext(ThemeContext);
  const [selected, setSelected] = useState(null);
  const cards = books
    .filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    .map((book) => (
      <Col key={book.asin}>
        <SingleCard
          book={book}
          token={token}
          selected={selected === book}
          setSelected={setSelected}
        ></SingleCard>
      </Col>
    ));
  return (
    <div className="mt-4">
      <Row
        xs={2}
        style={{ backgroundColor: theme.background, color: theme.foreground }}
      >
        <Col>
          <Row xs={1} md={2} lg={3} className="g-3">
            {cards}
          </Row>
        </Col>
        <Col>
          {selected && (
            <CommentArea book={selected} token={token} setError={setError} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BookList;
