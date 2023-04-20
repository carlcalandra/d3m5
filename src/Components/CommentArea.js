import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner} from "react-bootstrap";
import MyPagination from "./MyPagination";
export const CommentArea = ({book, setIsCommentModalOpen, token}) => {
  const [showModal, setShowModal] = useState(true)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1)

  const itemsPerPage = 20
  
  const getComments = async () => {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + book.asin, {
      method:"GET",
      headers:{
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }

    })
    return response.json();
  }
  
  useEffect(() => {
    setLoading(true)
    getComments()
      .then(response => {
        setComments(response)
        setLoading(false)
      });
  },[])

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      onExited={() => setIsCommentModalOpen(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`Comments for ${book.title}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading &&
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="info"/>
          </div>
        }
        {!loading && <MyPagination setActivePage={setActivePage} activePage={activePage} items={Math.ceil(comments.length/itemsPerPage)}/>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
