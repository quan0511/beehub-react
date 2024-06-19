import { Form } from "react-bootstrap";
import BeehubSpinner from "../../../components/BeehubSpinner";
import { useAdminPatchUserRoleMutation } from "../../adminApiSlice";

function UpdateRole({ id, role }) {
    const [updateRole, { isLoading }] = useAdminPatchUserRoleMutation()
    if (isLoading) return <BeehubSpinner size={'sm'} />
    else return (
        <Form.Select
            size="sm"
            className="py-0"
            value={role}
            onChange={e => updateRole({ id, role: e.currentTarget.value })}
            style={{ width: 86.6 }}>
            <option value="ROLE_ADMIN" >Admin</option>
            <option value="ROLE_USER" >User</option>
        </Form.Select>
    )
}

export default UpdateRole;