import { Card, Button} from "react-bootstrap";
import MyBadge from "./MyBadge";
import { useState } from "react";
import { CommentArea } from "./CommentArea";
import { Link } from "react-router-dom";


const SingleCard = ({book, selected, setSelected}) => {
  
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  return (
    <>
      <Card
        className={`h-100 pt-2 ${selected && "border border-danger"}`}
        onClick={() => setSelected(book)}
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
          <Link to={"/books/" + book.asin}><Button>Go to details</Button></Link>
        </Card.Footer> 
      </Card>
      {/* {isCommentModalOpen && <CommentArea book={book} setIsCommentModalOpen={setIsCommentModalOpen} token={token}/>} */}
    </>
  );
};

export default SingleCard;
