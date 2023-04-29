import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import MyPagination from "./MyPagination";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import useFetch from "../hooks/useFetch";

const baseUrl = "https://striveschool-api.herokuapp.com/api/comments/";


export class CommentArea extends React.Component {
  constructor(props) {
    super(props);
    this.headers = {
        Authorization: "Bearer iiit" + this.props.token,
        "Content-Type": "application/json",
      };
    this.itemsPerPage = 5;
    this.state = {
      comments: [],
      currentComments: [],
      activePage: 0,
      loading:false
    };
    this.lastPage = Math.ceil(this.state.comments.length / this.itemsPerPage)
  }
  async createComment(form) {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(form),
      });
      if (response.ok) {
        const data = await response.json();
        this.setState(prev => ({...prev, comments:[...prev.comments, data], activePage:this.state.currentComments.length === this.itemsPerPage ? this.lastPage + 1 : this.lastPage}));
      } else {
        throw Error();
      }
    } catch (error) {
      throw Error;
    }
  };
  async getComments() {
    this.setState(prev => ({...prev, loading:true}))
    try {
      const response = await fetch(baseUrl + this.props.book.asin, {
        method: "GET",
        headers: this.headers,
      });
      if (response.ok) {
        const data = await response.json();
        this.setState(prev => ({...prev, comments:data, activePage:Math.ceil(data.length/this.itemsPerPage)}));
        this.setCurrentComments(data)
      } else {
        throw Error();
      }
    } catch (error) {
      console.error(error)
    }
    this.setState(prev => ({...prev, loading:false}))
  };
  setCurrentComments(data){
    this.setState(prev => ({...prev, currentComments:data.slice((prev.activePage - 1) * this.itemsPerPage, prev.activePage * this.itemsPerPage)}))

  }
  setPage(page) {
    this.setState(prev => ({...prev, activePage:page}))
  }
  async componentDidMount() {
    await this.getComments()
  }
  async componentDidUpdate(prevProps, prevState){ 
    if (prevProps.book !== this.props.book) {
        await this.getComments()
    }
    if (prevState.activePage !== this.state.activePage) {
        this.setCurrentComments(this.state.comments)
    }
  }
  render(){
    return(
    <>
      {this.state.loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />
        </div>
      )}
      {!this.state.loading && (
        <CommentList
          comments={this.state.currentComments}
          token={this.state.token}
          setComments={(comments) => this.setState(prev => ({...prev, comments:comments}))}
          totalCommentsNum={this.state.comments.length}
          setActivePage={(activePage) => this.setState((prev) => ({...prev, activePage:activePage}))}
          lastPage={this.lastPage}
        />
      )}
      {!this.state.loading && this.state.comments.length > this.itemsPerPage && (
        <MyPagination
          setActivePage={(activePage) => this.setState((prev) => ({...prev, activePage:activePage}))}
          activePage={this.state.activePage}
          items={Math.ceil(this.state.comments.length / this.itemsPerPage)}
        />
      )}
      {!this.state.loading && (
        <AddComment
          asin={this.props.book.asin}
          createComment={this.createComment}
          setComments={(comments) => this.setState(prev => ({...prev, comments:comments}))}
          setActivePage={(activePage) => this.setState((prev) => ({...prev, activePage:activePage}))}
          lastPage={this.lastPage}
        />
      )}
    </>
    )
  }
}
// export const CommentArea = ({ book, token }) => {

//   const [comments, setComments, loading, error] = useFetch(baseUrl, headers);
//   const [currentComments, setCurrentComments] = useState([]);
//   const itemsPerPage = 5;
//   let lastPage = Math.ceil(comments.length / itemsPerPage);
//   const [activePage, setActivePage] = useState(lastPage);

//   const createComment = async (form) => {
//     try {
//       const response = await fetch(baseUrl, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(form),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setComments((prev) => [...prev, data]);
//         setActivePage(
//           currentComments.length === itemsPerPage ? lastPage + 1 : lastPage
//         );
//       } else {
//         throw Error();
//       }
//     } catch (error) {
//       throw Error;
//     }
//   };

//   useEffect(() => {
//     setCurrentComments(
//       comments.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
//     );
//   }, [activePage, comments]);
//   return (
//     <>
//       {loading && (
//         <div className="d-flex justify-content-center">
//           <Spinner animation="border" variant="info" />
//         </div>
//       )}
//       {!loading && (
//         <CommentList
//           comments={currentComments}
//           token={token}
//           setComments={setComments}
//           totalCommentsNum={comments.length}
//           setActivePage={setActivePage}
//           lastPage={lastPage}
//         />
//       )}
//       {!loading && comments.length > itemsPerPage && (
//         <MyPagination
//           setActivePage={setActivePage}
//           activePage={activePage}
//           items={Math.ceil(comments.length / itemsPerPage)}
//         />
//       )}
//       {!loading && (
//         <AddComment
//           asin={book.asin}
//           createComment={createComment}
//           setComments={setComments}
//           setActivePage={setActivePage}
//           lastPage={lastPage}
//         />
//       )}
//     </>
//   );
// };
