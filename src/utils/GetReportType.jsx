import { Badge } from "react-bootstrap"

export default function GetReportType({number, type}) {
    let count = number > 1 ? `${number} ` : ''
    switch (type) {
        case "violence":
        case "involve a child":
            return <Badge bg="danger">{count}{type}</Badge>
        case "drugs":
        case "spam":
        case "nudity":
            return <Badge bg="warning" text="dark">{count}{type}</Badge>
    }
}