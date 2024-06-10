import { Link as IconLink, PostcardHeartFill } from "react-bootstrap-icons";
import { BsPeople } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import ContentHeader from "../components/ContentHeader";
import { Link } from "react-router-dom";
import { useDashboardQuery } from "../adminApiSlice";
import { GrGroup } from "react-icons/gr";

function Dashboard() {
    const {data, isLoading} = useDashboardQuery()
    if (!data) return
    const {numOfUsers, numOfGroups, numOfPosts, numOfReports} = data;
    return (
        <>
        <ContentHeader title={'Dashboard'} pageName={'Dashboard'}/>
       
        <div className="admin-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="small-box text-bg-primary">
                            <div className="inner">
                                <h3>{numOfUsers}</h3>
                                <h5>Users</h5>
                            </div>
                            <BsPeople className="small-box-icon"/>
                            <Link to={'users'} className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">More info <IconLink/></Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">
                        <div className="small-box text-bg-success">
                            <div className="inner">
                                <h3>{numOfGroups}</h3>
                                <h5>Groups</h5>
                            </div>
                            <GrGroup className="small-box-icon"/>
                            <Link to={'groups'} className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">More info <IconLink/></Link>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-6">
                        <div className="small-box text-bg-warning">
                            <div className="inner">
                                <h3>{numOfPosts}</h3>
                                <h5>Posts</h5>
                            </div>
                            <PostcardHeartFill className="small-box-icon"/>
                            <Link to={'posts'} className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover text-dark">More info <IconLink/></Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">
                        <div className="small-box text-bg-danger">
                            <div className="inner">
                                <h3>{numOfReports}</h3>
                                <h5>Reports</h5>
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