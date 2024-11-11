import React from 'react';
import image from './Images/About-image.png'
import Navbar from './Navbar';
import './AboutUs.css'
function AboutUs(){
    const username=localStorage.getItem('username');
    return(
        <>
        <Navbar user={username}/>
        <div className='heading'>
            <h1>ABOUT US</h1>
        </div>
        <div className='container'>
            <section className='about'>
                <div className='about-image'>
                    <img src={image}></img>
                </div>
                <div className='about-content'>
                    <h2> Capturing Moments, Creating Stories </h2>
                    <p>"Visual Vibes" is a photography portfolio website designed to showcase a collection of captivating images. It allows creators to upload their work and curate visually appealing galleries. The platform emphasizes aesthetics, offering a sleek, user-friendly interface to enhance the viewing experience. With a focus on creativity, Visual Vibes provides a space for photographers to express their unique perspectives through stunning visuals.</p>
                    <a href='#'className='read-more'>Read More</a>
                </div>
            </section>
        </div>
        </>
    );
}

export default AboutUs;