// import React from "react";
    let text = document.getElementsByClassName('slogan');
    let i1 = document.getElementById('i1');
    let i2 = document.getElementById('i2');
    let i3 = document.getElementById('i3');
    let i4 = document.getElementById('i4');

    window.addEventListener('scroll', () => {

        let value = window.scrollY;

        // text.style.marginTop=value*2.5+"px";
        i1.style.left = value * 1.5 + "px";
    });
