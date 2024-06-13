import { Button } from "react-bootstrap";
import { useAdminBanUserMutation } from "../../adminApiSlice";
import BeehubSpinner from "../../../components/BeehubSpinner";

function BanButton({userId, isBanned, size}) {
    const [banUser, {error, isError, isLoading}] = useAdminBanUserMutation()

    return ( <>
        {isError && <small className="text-danger">{error.data.message}</small>}
        <Button onClick={banUser(userId)} variant="secondary" size={size}>
            {isLoading ? <BeehubSpinner/> : isBanned ? "Unban" : "Ban"}
        </Button>
    </> );
}

export default BanButton;