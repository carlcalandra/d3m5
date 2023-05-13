import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { nanoid } from 'nanoid';
import "../styles/MyCarousel.css"
import { Link } from 'react-router-dom';

const MyCarousel = ({books}) => {
    const bookPerItem = 5;
    const numOfSlides = Math.ceil(books.length/bookPerItem)
    const carouselItems = [];
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    for (let i = 0; i < numOfSlides; i++) {
        carouselItems.push(
        <Carousel.Item key={nanoid()}>
            <Container>
                <Row xs={bookPerItem} className='g-2'>
                    {books.slice(i*bookPerItem, (i+1)*bookPerItem).map(book => <Col key={book.asin}><Link to={"/books/" + book.asin}><img className='img-carousel' src={book.img}/></Link></Col>)}
                </Row>    
            </Container>
        </Carousel.Item>)
    }  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} className='py-5 mb-3 carousel' indicators={false}> 
        {carouselItems}
      </Carousel>
    );

}

export default MyCarousel;