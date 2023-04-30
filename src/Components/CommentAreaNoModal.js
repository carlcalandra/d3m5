import React, { useEffect, useState } from "react";
import { Spinner, ToastContainer } from "react-bootstrap";
import MyPagination from "./MyPagination";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import useFetch from "../hooks/useFetch";
import getLastPage from "../utils/getLastPage";
import MyToast from "./MyToast";
export const CommentArea = ({ book, token }) => {
  const baseUrl = "https://striveschool-api.herokuapp.com/api/comments/";
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const itemsPerPage = 5;
  const [comments, setComments, loading, errors, setErrors, setRefresher, activePage, setActivePage, setIsDelete] = useFetch(
    baseUrl + book.asin,
    headers,
    itemsPerPage
  );
  const [currentComments, setCurrentComments] = useState([]);

  const createComment = async (form) => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(form),
      });
      if (response.ok) {
        const data = await response.json();
        setRefresher(true);
      } else {
        throw Error();
      }
    } catch (error) {
        setErrors(prev => [...prev, error])
    }
  };

  useEffect(() => {
    setRefresher(true);
  }, [book]);

  useEffect(() => {
    setCurrentComments(
      comments.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
    );
  }, [activePage, comments]);

  const toastEls = errors.map(error => <MyToast title="Error" text={error.message} onClose={() => {setErrors(prev => prev.filter(prevErr => prevErr !== error))}}/>)
  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />
        </div>
      )}
      <ToastContainer position="top-end" className="p-3">
        {toastEls}
      </ToastContainer>
      {!loading && (
        <CommentList
          comments={currentComments}
          token={token}
          setComments={setComments}
          totalCommentsNum={comments.length}
          setActivePage={setActivePage}
          lastPage={getLastPage(comments, itemsPerPage)}
          setRefresher={setRefresher}
          setIsDelete={setIsDelete}
        />
      )}
      {!loading &&
        comments.length > itemsPerPage &&
        currentComments.length > 0 && (
          <MyPagination
            setActivePage={setActivePage}
            activePage={activePage}
            items={getLastPage(comments, itemsPerPage)}
          />
        )}
      {!loading && (
        <AddComment
          asin={book.asin}
          createComment={createComment}
          setComments={setComments}
          setActivePage={setActivePage}
          lastPage={getLastPage(comments, itemsPerPage)}
        />
      )}
    </>
  );
};
