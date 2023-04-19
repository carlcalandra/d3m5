import { Card } from "react-bootstrap";
import MyBadge from "./MyBadge";
import { useState } from "react";


const SingleCard = ({book}) => {
    const [selected, setSelected] = useState(false);
    return (
        <Card className={`h-100 py-4 ${selected && "border border-danger"}`} onClick={()=> setSelected(prev => !prev)        }>
          <Card.Img src={book.img} className="object-fit-contain" style={{height:"400px"}}/>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
          </Card.Body>
        </Card>
      );
} 

export default SingleCard;