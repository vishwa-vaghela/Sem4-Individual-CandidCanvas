import React from 'react';
import './Footer.css';
import logo1 from './CandidCanvasLogo_2.png';

function Footer(){
    return(
        <>
            <footer>
                <div className='footer-col'>
                    <img src={logo1} className='logo1-img'></img>
                </div>
        <div class="footer-col">
            <h4>products</h4>
            <ul>
                <li><a href="#">teams</a></li>
                <li><a href="#">advertising</a></li>
                <li><a href="#">talent</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Inspired by</h4>
            <ul>
                <li><a href="#">Pinterest</a></li>
                <li><a href="#">Unsplash</a></li>
                <li><a href="#">Dupe</a></li>
                <li><a href="#">Pixabay</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>company</h4>
            <ul>
                <li><a href="#">about</a></li>
                <li><a href="#">legal</a></li>
                <li><a href="#">contact us</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>follow us</h4>
            <div class="links">
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </footer>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
        </>
    )
}
export default Footer