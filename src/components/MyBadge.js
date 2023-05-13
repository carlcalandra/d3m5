import {Badge} from "react-bootstrap"

const MyBadge = ({text, color}) => {
    return (
        <Badge bg={color}>{text}</Badge>
    )
};

export default MyBadge;