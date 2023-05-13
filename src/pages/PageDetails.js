import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { PacmanLoader } from "react-spinners";
import PageDetailMain from "../components/PageDetailMain";
import TokenContext from "../context/TokenContext";

const PageDetails = () => {
  const navigate = useNavigate();
  const { asin } = useParams();
  const {token} = useContext(TokenContext);

  const [book, setData, loading] = useFetch(
    "https://epibooks.onrender.com/" + asin
  );
  useEffect(() => {
    if (!loading && book.length === 0) {
      navigate("/error");
    }
  }, [book]);
  return (
    <Container>
      {(loading || token.length===0) && (
        <div className="d-flex justify-content-center vh-100 v-100 align-items-center">
          <PacmanLoader color="#36d7b7" size={50} />
        </div>
      )}
      {!loading && token.length>0 && (book.length) && <PageDetailMain book={book[0]} />}
    </Container>
  );
};

export default PageDetails;
