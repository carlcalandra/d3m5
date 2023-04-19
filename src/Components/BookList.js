import { Row, Col } from 'react-bootstrap';
import SingleCard from './SingleCard';

const BookList = ({books}) => {
    const cards = books.map(book => <Col key={book.asin}><SingleCard book={book}></SingleCard></Col>)
    return (
            <Row xs={1} md={2} lg={3} className='g-3 mb-3'>
                {cards}
            </Row>
    )
}

export default BookList;