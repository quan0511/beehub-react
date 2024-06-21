import { FaLaptop, FaShoppingBasket } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa6';
import './LoginPage.css'

function LoginRegisterLayout({children}) {
    return <div className='position-relative h-100vh'>
            <div className="bg-black">
                <div className="container">
                    <div className="d-flex justify-content-center py-4">
                        <div className='text-white' style={{letterSpacing: 1.8}}>
                            <img className='me-2' width={40} src="./assets/images/beehub-logo.svg" alt="logo" /> Beehub
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid custom-container mt-md-5">
                <div className="row flex-row-reverse">
                    <div className="col-12 col-md-6 bg-white py-5">
                        <div className="d-flex flex-column align-items-center ">
                            <div className="mb-5">
                                <img width={60} src="https://mythemestore.com/beehive-preview/wp-content/uploads/2020/07/logo-icon.svg" alt="" />
                            </div>
                            <h2 className="mb-2 fw-bold">Welcome</h2>
                            <small className="mb-4">Join gazillions of people online</small>
                            
                            {children}
                        </div>
                    </div>

                    <div className='col-12 col-md-6 background-primary text-white p-5'>
                        <div className='mb-4 text-center'>
                            <h3 className='fw-bold'>Join Now</h3>
                            <p className=''>Join Beehub and explore people with same interests.</p>
                        </div>

                        <div className='text-center'>
                            <div className="icon-wrapper">
                                <FaBriefcase />
                            </div>
                            <h4 className='fw-bold'>Build your own profile</h4>
                            <p>Impress others with your own profile.</p>
                        </div>

                        <div className='text-center'>
                            <div className="icon-wrapper">
                                <FaLaptop />
                            </div>
                            <h4 className='fw-bold'>Community</h4>
                            <p>Sharing life journey through posts and messages.</p>
                        </div>

                        <div className='text-center'>
                            <div className="icon-wrapper">
                                <FaShoppingBasket />
                            </div>
                            <h4 className='fw-bold'>Online shop</h4>
                            <p>Purchase you own item right in the platform.</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg">
                <div className="bg-backup d-md-none"></div>
                <video className='d-none d-md-block' autoPlay muted playsInline loop src="https://mythemestore.com/friend-finder/videos/8.mp4"></video>
                <div className="bg-overlay"></div>
            </div>
        </div>
}

export default LoginRegisterLayout;