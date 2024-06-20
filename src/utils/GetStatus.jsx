import { Badge } from "react-bootstrap"

export default function GetStatus({status}) {
    const width = 62
    if (status === 'active') return <Badge bg="success" style={{width}}>Active</Badge>
    if (status === 'inactive') return <Badge bg="secondary" style={{width}}>Inactive</Badge>
    if (status === 'banned') return <Badge bg="secondary" style={{width}}>Banned</Badge>
    if (status === 'blocked') return <Badge bg="danger" style={{width}}>Blocked</Badge>
}