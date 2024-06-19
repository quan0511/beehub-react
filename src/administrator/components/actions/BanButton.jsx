import { Button } from "react-bootstrap";
import { useAdminBanUserMutation } from "../../adminApiSlice";
import BeehubSpinner from "../../../components/BeehubSpinner";

function BanButton({userId, isBanned, size}) {
    const [banUser, {error, isError, isLoading}] = useAdminBanUserMutation()

    const handleBan = async (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        await banUser(id)
    }
    return ( <>
        {/* {isError && <small className="text-danger">{error.data.message}</small>} */}
        <Button onClick={e => handleBan(e, userId)} variant="secondary" size={size} style={{width: 62}}>
            {isLoading ? '...' : isBanned ? "Unban" : "Ban"}
        </Button>
    </> );
}

export default BanButton;