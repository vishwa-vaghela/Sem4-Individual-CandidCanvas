import React, { useState,useEffect } from "react";
import './CarouselThree.css';
import img1 from './Images/1.jpg';
import img2 from './Images/2.png';
import img3 from './Images/3.png';
import img4 from './Images/4.png';
import img5 from './Images/5.png';
import img6 from './Images/6.png';
import img7 from './Images/7.png';
function CarouselThree(){
    useEffect(()=>{
        const initSlider=()=>{
            const slideButtons=document.querySelectorAll(".slider-wrapper .slide-button")
            const imageList=document.querySelector(".slider-wrapper .image-list")
            const sliderScrollbar=document.querySelector("#carousel3 .slider-scrollbar");
            const scrollbarThumb=sliderScrollbar.querySelector(".scrollbar-thumb");
            const maxScrollLeft=imageList.scrollWidth-imageList.clientWidth;

            scrollbarThumb.addEventListener("mousedown",(e)=>{
                const startX=e.clientX;
                var thumbPosition=scrollbarThumb.offsetLeft;

                const handleMouseMove=(e)=>{
                    const deltaX=e.clientX - startX;
                    const newthumbPosition=thumbPosition+deltaX;
                    const maxThumbPosition=sliderScrollbar.getBoundingClientRect().width-scrollbarThumb.offsetWidth;
                    const boundedPosition=Math.max(0,Math.min(maxThumbPosition,newthumbPosition))
                    const scrollPosition=(boundedPosition/maxThumbPosition)*maxScrollLeft;
                    scrollbarThumb.style.left=`${boundedPosition}px`;
                    imageList.scrollLeft=scrollPosition;
                }

                const handleMouseUp=()=>{
                    document.removeEventListener("mousemove",handleMouseMove);
                    document.removeEventListener("mouseup",handleMouseUp)
                }
                document.addEventListener("mousemove",handleMouseMove);
                document.addEventListener("mouseup",handleMouseUp)
            })

            slideButtons.forEach(button=>{
                button.addEventListener("click",()=>{
                    const direction=button.id === "prev-slide" ? -1 : 1;
                    console.log(direction)
                    const scrollAmount=imageList.clientWidth * direction;
                    console.log(scrollAmount)
                    imageList.scrollBy({left:scrollAmount,behavior:"smooth"})
                })
            })

            const updateScrollThumbPosition=()=>{
                const scrollPosition=imageList.scrollLeft;
                const thumbPosition=(scrollPosition/maxScrollLeft)*(sliderScrollbar.clientWidth-scrollbarThumb.offsetWidth);
                scrollbarThumb.style.left=`${thumbPosition}px`;
            }

            imageList.addEventListener("scroll",()=>{
                updateScrollThumbPosition();
            })


        }
        initSlider();
    },true);
    return(
        
        <div className="body-3">
            <div id="carousel3">
                 <div className="slider-wrapper">
                    {/* <div>
                    <button id="prev-slide" className="slide-button"><ion-icon name="arrow-back-outline"></ion-icon></button>
                    </div> */}
                    <div className="image-list">
                        <img src={img1} className="image-item"/>
                        <img src={img2} className="image-item"/>
                        <img src={img3} className="image-item"/>
                        <img src={img4} className="image-item"/>
                        <img src={img5} className="image-item"/>
                        <img src={img6} className="image-item"/>
                        <img src={img7} className="image-item"/>
                    </div>
                    {/* <div>
                    <button id="next-slide" className="slide-button"><ion-icon name="arrow-forward-outline"></ion-icon></button>
                    </div> */}
                </div>
                <div className="slider-scrollbar">
                    <div className="scrollbar-track">
                        <div className="scrollbar-thumb">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CarouselThree;