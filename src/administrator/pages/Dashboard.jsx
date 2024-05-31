import { Box, Link as IconLink, PostcardHeartFill } from "react-bootstrap-icons";
import { BsPeople } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import ContentHeader from "../components/ContentHeader";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <>
        <ContentHeader title={'Dashboard'}/>

        <div className="admin-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="small-box text-bg-primary">
                            <div className="inner">
                                <h3>1000</h3>
                                <p>Users</p>
                            </div>
                            <BsPeople className="small-box-icon"/>
                            <Link to={'users'} className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">More info <IconLink/></Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">
                        <div className="small-box text-bg-success">
                            <div className="inner">
                                <h3>555</h3>
                                <p>Posts</p>
                            </div>
                            <PostcardHeartFill className="small-box-icon"/>
                            <Link to={'posts'} className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">More info <IconLink/></Link>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-6">
                        <div className="small-box text-bg-warning">
                            <div className="inner">
                                <h3>222</h3>
                                <p>Products</p>
                            </div>
                            <Box className="small-box-icon"/>
                            <Link to={'shop'} className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">More info <IconLink/></Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">
                        <div className="small-box text-bg-danger">
                            <div className="inner">
                                <h3>20</h3>
                                <p>Reports</p>
                            </div>
                            <GoReport className="small-box-icon"/>
                            <Link to={'reports'} className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">More info <IconLink/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;