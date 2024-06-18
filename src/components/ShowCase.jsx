import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ShowCase.css"

function ShowCase() {
    return (
        <div className="d-none d-md-block showcase shadow-sm p-3">
            <h5 className="title">Products</h5>
            <ul className="product-list">
                <li>
                    <Link to={'/'} className="d-block">
                        <Image className="float-start me-2" alt="product" src="https://mythemestore.com/beehive-preview/wp-content/uploads/2020/04/turtle-neck-1.jpg" rounded width="60" />
                        <span className="product-name">Turtleneck Sweater</span>
                    </Link>
                    <span className="product-price">$20</span>
                </li>
                <li>
                    <Link to={'/'} className="d-block">
                        <Image className="float-start me-2" alt="product" src="https://mythemestore.com/beehive-preview/wp-content/uploads/2020/04/indigo-1-600x600.jpg" rounded width="60" />
                        <span className="product-name">Vintage Shirt</span>
                    </Link>
                    <span className="product-price">$20</span>
                </li>
                <li>
                    <Link to={'/'} className="d-block">
                        <Image className="float-start me-2" alt="product" src="https://mythemestore.com/beehive-preview/wp-content/uploads/2020/04/shirt-pink-1.jpg" rounded width="60" />
                        <span className="product-name">Stretch Short Sleeve</span>
                    </Link>
                    <span className="product-price">$20</span>
                </li>
                <li>
                    <Link to={'/'} className="d-block">
                        <Image className="float-start me-2" alt="product" src="https://mythemestore.com/beehive-preview/wp-content/uploads/2020/04/shorts-1.jpg" rounded width="60" />
                        <span className="product-name">Slimfit Shorts Men</span>
                    </Link>
                    <span className="product-price">$20</span>
                </li>
                <li>
                    <Link to={'/'} className="d-block">
                        <Image className="float-start me-2" alt="product" src="https://mythemestore.com/beehive-preview/wp-content/uploads/2020/04/top-1.jpg" rounded width="60" />
                        <span className="product-name">Ruffled Top</span>
                    </Link>
                    <span className="product-price">$20</span>
                </li>
            </ul>
        </div>
    );
}

export default ShowCase;