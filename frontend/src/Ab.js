import { React, useEffect,useState,useRef} from "react";
import './Ab.css';
import i1 from "./Images/img-1.jpg";
import i3 from "./Images/img-3.jpg";
import i4 from "./Images/img-4.jpg";
import i5 from "./Images/img-5.jpg";
import i6 from "./Images/img-6.jpg";
import i2 from "./Images/img-2.jpg";

function Ab(){
    useEffect(()=>{
        //getting all required elements
        const gallery  = document.querySelectorAll(".image"),
        previewBox = document.querySelector(".preview-box"),
        previewImg = previewBox.querySelector("img"),
        closeIcon = previewBox.querySelector(".icon"),
        currentImg = previewBox.querySelector(".current-img"),
        totalImg = previewBox.querySelector(".total-img"),
        shadow = document.querySelector(".shadow");

        // window.onload = ()=>{
            for (let i = 0; i < gallery.length; i++) {
                totalImg.textContent = gallery.length; //passing total img length to totalImg variable
                let newIndex = i; //passing i value to newIndex variable
                let clickedImgIndex; //creating new variable
                
                gallery[i].onclick = () =>{
                    clickedImgIndex = i; //passing cliked image index to created variable (clickedImgIndex)
                    function preview(){
                        currentImg.textContent = newIndex + 1; //passing current img index to currentImg varible with adding +1
                        let imageURL = gallery[newIndex].querySelector("img").src; //getting user clicked img url
                        previewImg.src = imageURL; //passing user clicked img url in previewImg src
                    }
                    preview(); //calling above function
            
                    const prevBtn = document.querySelector(".prev");
                    const nextBtn = document.querySelector(".next");
                    if(newIndex == 0){ //if index value is equal to 0 then hide prevBtn
                        prevBtn.style.display = "none"; 
                    }
                    if(newIndex >= gallery.length - 1){ //if index value is greater and equal to gallery length by -1 then hide nextBtn
                        nextBtn.style.display = "none"; 
                    }
                    prevBtn.onclick = ()=>{ 
                        newIndex--; //decrement index
                        if(newIndex == 0){
                            preview(); 
                            prevBtn.style.display = "none"; 
                        }else{
                            preview();
                            nextBtn.style.display = "block";
                        } 
                    }
                    nextBtn.onclick = ()=>{ 
                        newIndex++; //increment index
                        if(newIndex >= gallery.length - 1){
                            preview(); 
                            nextBtn.style.display = "none";
                        }else{
                            preview(); 
                            prevBtn.style.display = "block";
                        }
                    }
                    document.querySelector("body").style.overflow = "hidden";
                    previewBox.classList.add("show"); 
                    shadow.style.display = "block"; 
                    closeIcon.onclick = ()=>{
                        newIndex = clickedImgIndex; //assigning user first clicked img index to newIndex
                        prevBtn.style.display = "block"; 
                        nextBtn.style.display = "block";
                        previewBox.classList.remove("show");
                        shadow.style.display = "none";
                        document.querySelector("body").style.overflow = "scroll";
                    }
                }
                
            } 
        // }
    })

    return(
        <>
  <div class="wrapper">
    <div class="gallery">
      <div class="image"><span><img src={i1} alt=""/></span></div>
      <div class="image"><span><img src={i2} alt=""/></span></div>
      <div class="image"><span><img src={i3} alt=""/></span></div>
      <div class="image"><span><img src={i4} alt=""/></span></div>
      <div class="image"><span><img src={i5} alt=""/></span></div>
      <div class="image"><span><img src={i6} alt=""/></span></div>
    </div>
  </div>
  <div class="preview-box">
    <div class="details">
      <span class="title">Image <p class="current-img"></p> of <p class="total-img"></p></span>
      <span class="icon fas fa-times"></span>
    </div>
    <div class="image-box">
      <div class="slide prev"><i class="fas fa-angle-left"></i></div>
      <div class="slide next"><i class="fas fa-angle-right"></i></div>
      <img src="" alt=""/>
    </div>
  </div>
  <div class="shadow"></div>

        </>
    )
}
export default Ab;