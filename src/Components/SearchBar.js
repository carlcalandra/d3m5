import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

const SearchBar = ({ data, setFilteredData }) => {
    const [search, setSearch] = useState('');
    useEffect(() => {
        setTimeout(() => {
            if (search.length > 3) {
                setFilteredData(data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())))
            } 
        }, 3000)
    },[search, data, setFilteredData])

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                    type="text" 
                    placeholder="Filter your book" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value) } />
            </Form.Group>
        </Form>
    )
}



export default SearchBar;