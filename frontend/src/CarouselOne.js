import { React, useEffect, useState } from "react";
import axios from "axios";
import './CarouselOne.css';
import { useNavigate } from "react-router-dom";

function CarouselOne() {

    const navigate=useNavigate();
    const [images,setImages]=useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);  // Flag to check if images are loaded

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/fetch-images-for-most-liked/');
                setImages(response.data.images);
                setImagesLoaded(true);  // Set flag to true after images are loaded
            } catch (err) {
                console.log(err);
            }
        }
        fetchImages();
    }, []);  // Empty dependency array to run this effect only once

    useEffect(() => {
        if (imagesLoaded) {  // Only run the carousel logic after images are successfully loaded
            let nextDom = document.getElementById('next');
            let prevDom = document.getElementById('prev');
            let carouselDom = document.querySelector('.carousel');
            let SliderDom = carouselDom.querySelector('.carousel .list');
            let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
            let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
            let timeRunning = 3000;
            let timeAutoNext = 7000;

            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

            nextDom.onclick = function () {
                showSlider('next');
            }

            prevDom.onclick = function () {
                showSlider('prev');
            }

            let runTimeOut;
            let runNextAuto = setTimeout(() => {
                nextDom.click();
            }, timeAutoNext);

            function showSlider(type) {
                let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
                let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

                if (type === 'next') {
                    SliderDom.appendChild(SliderItemsDom[0]);
                    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
                    carouselDom.classList.add('next');
                } else {
                    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
                    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
                    carouselDom.classList.add('prev');
                }

                clearTimeout(runTimeOut);
                runTimeOut = setTimeout(() => {
                    carouselDom.classList.remove('next');
                    carouselDom.classList.remove('prev');
                }, timeRunning);

                clearTimeout(runNextAuto);
                runNextAuto = setTimeout(() => {
                    nextDom.click();
                }, timeAutoNext);
            }
        }
    }, [imagesLoaded]);

    return (
        <div id="carousel-1" className="body-trending">
            <div class="carousel">
                <div class="list">
                    {
                        images.map(img => (
                            <div class="item">
                                <img src={img.photo_image_url} />
                                <div class="content">
                                    <div class="author">{img.user_id}</div>
                                    <div class="title">Captured By</div>
                                    <div class="topic">{img.username}</div>
                                    <div class="des">
                                        {img.ai_description}
                                    </div>
                                    <div class="buttons">
                                        <button><a href={`/artist-profile/${img.username}`} style={{color:'white'}}>Visit Profile</a></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div class="thumbnail">
                    {
                        images.map(img => (
                            <div class="item">
                                <img src={img.photo_image_url} />
                                <div class="content">
                                    <div class="title">
                                        {img.user_id}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div class="arrows">
                    <button id="prev"><ion-icon name="arrow-back-outline"></ion-icon></button>
                    <button id="next"><ion-icon name="arrow-forward-outline"></ion-icon></button>
                </div>

                <div class="time"></div>
            </div>
        </div>
    );
}

export default CarouselOne;