import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from './Footer';
// import Profile from "./Profile";
import './Home.css';
import { useLocation, useNavigate } from "react-router-dom";
import i1 from './Images/image1.jpg';
import i2 from './Images/image2.jpg';
import i3 from './Images/image3.jpg';
import i4 from './Images/image4.jpg';
import { GridLoader } from 'react-spinners';

const GridLayout = lazy(() => import('./Grid'));

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem('username') || null);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const userQuery = query.get('user');
        if (userQuery) {
            localStorage.setItem('username', userQuery);
            setUser(userQuery);
        }
    }, [location]);


    

    return (
        <>
            {/* <div> */}
                {/* Passing user to navbar.js component */}
                <Navbar user={user}  />
            {/* </div> */}
            <div className="body-parallax">
                <section className='images'>
                    <img src={i1} alt='image1' className='i1' id='i1' />
                    <img src={i2} alt='image2' className='i2' id='i2' />
                    <img src={i3} alt='image3' className='i3' id='i3' />
                    <img src={i4} alt='image4' className='i4' id='i4' />
                    {/* <h2 className='slogan'>"Where Art Meets the Lens"</h2> */}
                </section>

            </div>
            <div>
                <Suspense fallback={() => {
                    <GridLoader
                        color="#2a5ab2"
                        loading
                        margin={4}
                        size={15}
                        speedMultiplier={1}
                        width={2}
                    />
                }}>
                    <GridLayout />
                </Suspense>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default Home;