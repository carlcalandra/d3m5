import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { CommentArea } from "./CommentAreaNoModal";
import { Link } from "react-router-dom";

const PageDetailMain = ({ book}) => {
  return (
    <div className="py-2">
      <h2>{book.title}</h2>
      <Row xs={2}>
        <Col>
          <img src={book.img} className="img-fluid mb-2" />
          <div className="d-flex justify-content-center">
            <Link to={"/"}>
              <Button>Back home</Button>
            </Link>
          </div>
        </Col>
        <Col>
          {<CommentArea book={book} />}
        </Col>
      </Row>
    </div>
  );
};

export default PageDetailMain;
