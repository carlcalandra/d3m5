import { Card, Button} from "react-bootstrap";
import MyBadge from "./MyBadge";
import { useState } from "react";
import { CommentArea } from "./CommentArea";


const SingleCard = ({book, token}) => {
  const [selected, setSelected] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  return (
    <>
      <Card
        className={`h-100 pt-2 ${selected && "border border-danger"}`}
        onClick={() => setSelected((prev) => !prev)}
      >
        <Card.Img
          src={book.img}
          className="object-fit-contain"
          style={{ height: "400px" }}
        />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <Button onClick={() => setIsCommentModalOpen(true)}>Comments</Button>
        </Card.Footer> 
      </Card>
      {isCommentModalOpen && <CommentArea book={book} setIsCommentModalOpen={setIsCommentModalOpen} token={token}/>}
    </>
  );
};

export default SingleCard;
