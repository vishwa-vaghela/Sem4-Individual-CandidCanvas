import React, { useState,useEffect } from "react";
import './CarouselTwo.css';
import axios from "axios";

function CarouselTwo() {
    const [activeIndex, setActiveIndex] = useState(3); // Start with the 4th image as active (index 3)
    const [images,setImages]=useState([]);

    useEffect(() => {
        async function fetchImages() {
          try {
            const response = await axios.get('http://127.0.0.1:8000/fetch-images-for-most-followed/');
            setImages(response.data.images);
          } catch (err) {
            console.log(err);
          }
        }
        fetchImages();
      }, []);

    // function handleClick(){
    //     alert('button clicked!!!');
    // }

    return (
        <div id="carousel2">
            <section className="slider-container">
                <div className="slider-images">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`slider-img ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}>
                            <img src={`http://127.0.0.1:8000${image.profile_img}`} alt={index + 1} />
                            <h1>{image.user_id}</h1>
                            <div className="details">
                                <h2>{image.username}</h2>
                                <p>{image.role}</p> 
                                 <a href={`/artist-profile/${image.username}`}>Visit Profile</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default CarouselTwo;
