import React from 'react'
import { StarFill } from 'react-bootstrap-icons'


const StarRate = ({rate}) => {
    const starEl = [...Array(rate)].map((_, i) => <StarFill key={i}/>)
  return (
    <span>{starEl}</span>
  )
}

export default StarRate