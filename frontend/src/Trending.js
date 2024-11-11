import React from "react";
import CarouselOne from "./CarouselOne";
import CarouselTwo from "./CarouselTwo";
// import CarouselThree from "./CarouselThree";
import Navbar from "./Navbar";
import './Trending.css';

function Trending() {
    const username=localStorage.getItem('username');
    return (
        <div>
            <Navbar user={username} />
            <div className="heading" id="h1">
                Most Liked
            </div>
            <CarouselOne />
            <div className="heading" id="h2">
                Most Followed
            </div>
            <CarouselTwo />
        </div>
    );
}

export default Trending;