import { Link, useNavigate } from "react-router-dom";
import './Hero.css'
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

function Hero({ img, title, timestamp, linkTitle, linkUrl }) {
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const handleLinkNavigate = async (e, to) => {
        e.preventDefault()
        e.stopPropagation()
        navigate(to)
    }

    return (
        <li className="nav-item dropdown" data-bs-toggle="dropdown">
            <a href="#" className="dropdown-toggle  text-decoration-none text-black" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <img
                    width={40}
                    height={40}
                    className="rounded-circle shadow me-2"
                    src={img}
                />
                <span className="d-none d-md-inline align-middle">{user?.username}</span>
            </a>
            <ul className="hero dropdown-menu p-0 dropdown-menu-lg dropdown-menu-end">
                <li className="hero-header text-bg-primary">
                    <img
                        width={90}
                        height={90}
                        className="rounded-circle shadow border-1"
                        src={img}
                    />
                    <p className="pt-2 pb-0 text-break"> {title}
                        <small className="d-block">Member since {timestamp}</small>
                    </p>
                </li>
                <li className="hero-actions">
                    <Link onClick={(e) => handleLinkNavigate(e, linkUrl)} to={linkUrl} className="d-flex justify-content-center w-50 text-black text-decoration-none p-2">{linkTitle}</Link>
                    <Link onClick={(e) => handleLinkNavigate(e, '/logout')} to={'/logout'} className="d-flex justify-content-center w-50 text-black text-decoration-none p-2">Logout</Link>
                </li>
            </ul>
        </li>
    );
}

export default Hero;