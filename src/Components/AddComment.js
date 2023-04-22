import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin, createComment, setComments, setActivePage,  lastPage}) => {
  const formInitial = {
    comment: "",
    rate: "1",
    elementId: asin,
  }

  const [form, setForm] = useState(formInitial);

  const handleFormChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        await createComment(form);
        setForm(formInitial);
    } catch (error){

    }
}

  const radioEls = [];
  for (let i = 1; i <= 5; i++) {
    radioEls.push(
      <Form.Check
        className="mx-2"
        type="radio"
        name="rate"
        value={`${i}`}
        key={i}
        label={i}
        onChange={handleFormChange}
        checked={`${i}` === form.rate}
      ></Form.Check>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
        <h3>Invia il tuo commento</h3>
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Your comment"
          name="comment"
          onChange={handleFormChange}
          value={form.comment}
        />
      </Form.Group>
      <Form.Group className="d-flex px-3 py-1 border rounded mb-2">
        <Form.Label className="my-0">Your rate</Form.Label>
        {radioEls}
      </Form.Group >
      <div className="d-flex justify-content-center">
        <Button type="submit">Send</Button>
      </div>    
    </Form>
  );
};

export default AddComment;
