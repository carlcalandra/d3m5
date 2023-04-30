import React from 'react'
import { Button, Card } from 'react-bootstrap'
import StarRate from './StarRate'

const SingleComment = ({comment, token, setComments, setRefresher, setIsDelete}) => {
    const handleDelete = async () => {
        try {
            const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + comment._id, {
                method:"DELETE",
                headers:{
                  "Authorization": "Bearer " + token,
                  "Content-Type": "application/json"
                }
            })
            if (response.ok){
                console.log("sei qui")
                console.log(setRefresher)
                setIsDelete(true)
                setRefresher(true)
            }
            
        } catch (error) {
            console.error(error)
        }

    }
  return (
    <Card className='mb-2'>
        <Card.Body>
            <Card.Text as='div'>
                <p>Comment: {comment.comment}</p>
                <div className='d-flex justify-content-between'>
                    <span>Author: {comment.author}</span>
                    <StarRate rate={parseInt(comment.rate)}/>
                </div>
            </Card.Text>
            <Button variant='danger' size='sm' onClick={handleDelete}>Delete Comment</Button>
        </Card.Body>
    </Card>
  )
}

export default SingleComment