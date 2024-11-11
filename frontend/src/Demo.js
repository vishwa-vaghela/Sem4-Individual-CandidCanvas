import React, { useEffect } from "react";

function BasicScrollTest() {
    useEffect(() => {
        const handleScroll = () => {
            console.log("Scroll event fired"); // Should print every time you scroll
            const value = window.scrollY;
            console.log("ScrollY value: ", value); // Should print the current scroll position
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <div style={{ height: '100vh', padding: '10px' }}>
            <h1>Scroll down to see the event in action</h1>
        </div>
    );
}

export default BasicScrollTest;
