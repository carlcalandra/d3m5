import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import MyBadge from "./MyBadge";

function MyToast({ title, text, color, onClose }) {
  const [show, setShow] = useState(true);

  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime((prev) => (prev += 1));
    }, 1000);
  }, []);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const timeText =
    time <= 60 ? `${time} seconds ago` : `${Math.floor(time / 60)} mins ago`;
  return (
    <Toast show={show} onClose={handleClose} className="mb-2">
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <div className="me-auto">
          <MyBadge color="danger" text={title}/>
        </div>
        <small>{timeText}</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
}

export default MyToast;
