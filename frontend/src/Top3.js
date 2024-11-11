import { React, useEffect,useState} from "react";
import './Top3.css';
import i1 from './Images/image1.jpg';

function Top3() {
    const posts = [
        {
            id: 1,
            username: 'User1',
            caption: 'A beautiful sunrise!',
            imageUrl: 'https://images.unsplash.com/photo-1415340839394-8e0c3c29672c',
        },
        {
            id: 2,
            username: 'User2',
            caption: 'Lovely beach vibes.',
            imageUrl: 'https://via.placeholder.com/400x300',
        },
        {
            id: 3,
            username: 'User3',
            caption: 'A beautiful sunrise!',
            imageUrl: 'https://via.placeholder.com/400x300',
        }
        // Add more posts as needed
    ];

    useEffect(() => {
        const menu = document.querySelector(".menu");
        const hamMenuIcon = document.querySelector(".ham-menu-icon");
        let i = true;

        hamMenuIcon.addEventListener("click", (e) => {
            if (i) {
                menu.style.display = 'flex';
                e.target.classList.remove("bi-list"); //e.target = icon 
                e.target.classList.add("bi-x-lg");
                i = false;
            } else {
                e.target.classList.remove("bi-x-lg");
                e.target.classList.add("bi-list"); //e.target = icon 
                menu.style.display = 'none';
                i = true;
            }

        });
        
    }, []);
    function LikeButton() {
        const [likes, setLikes] = useState(0);

        const handleLike = () => {
            setLikes(likes + 1);
        };

        return (
            <button className="like-button" onClick={handleLike}>
                ❤️ {likes} Likes
            </button>
        );
    }
    function CommentButton() {
        const [showCommentBox, setShowCommentBox] = useState(false);

        const toggleCommentBox = () => {
            setShowCommentBox(!showCommentBox);
        };
        return (
            <div>
                <button className="comment-button" onClick={toggleCommentBox}>
                    💬 Comment
                </button>
                {showCommentBox && (
                    <textarea className="comment-box" placeholder="Write a comment..."></textarea>
                )}
            </div>
        );
    }

    return (
        // <div>
        //     <header class="w-[85%]  xl:w-[73%]  container hidden lg:flex justify-between h-[60px]  items-center py-[45px] border-b-[1px] border-white border-opacity-40"
        //         id="header">
        //             <figure class="w-[140px]">
        //                 <img src={i1} alt="" class="w-[100%]"/>
        //             </figure>
        //         <nav class="h-[100%] md:w-[70%]" id="nav">
        //             <ul class="h-[100%] flex items-center gap-8 justify-end">
        //                 <li class="list-none  "><a
        //                     class="decoration-none hover:text-color3 transition-all duration-500"
        //                     href="#top">Home</a></li>
        //                 <li class="list-none"><a
        //                     class="decoration-none  hover:text-color3 transition-all duration-500"
        //                     href="#aboutus">About</a></li>
        //                 <li class="list-none "><a
        //                     class="decoration-none  hover:text-color3 transition-all duration-500"
        //                     href="#tours">Tours</a></li>
        //                 <li class="list-none"><a
        //                     class="decoration-none  hover:text-color3 transition-all duration-500"
        //                     href="#destinations">Destinations</a></li>
        //                 <li class="list-none "><a
        //                     class="decoration-none  hover:text-color3 transition-all duration-500"
        //                     href="#blog">Blog</a></li>
        //                 <li class="list-none"><a
        //                     class="decoration-none  hover:text-color3 transition-all duration-500"
        //                     href="#contactus">Contact</a></li>
        //             </ul>
        //         </nav>
        //     </header>

        //     {/* <!-- header for mobile --> */}
        //     {/* <header id="header"
        //         class="w-[95%] sm:w-[70%] md:w-[80%] container flex h-[60px] justify-between  items-center  lg:hidden  py-[45px] relative border-b-[1px] border-white border-opacity-40 ">
        //         <div class=" w-1/2 h-full flex justify-end items-center ">
        //             <i
        //                 class="bi bi-list text-3xl text-white cursor-pointer ham-menu-icon"></i>
        //         </div>
        //         <nav class="menu hidden h-[400px] w-full absolute bg-white left-0 top-[90px]   z-30"
        //             id="nav">
        //             <ul class="h-full w-full flex flex-col  justify-center ms-6">
        //                 <li class="list-none my-3"><a
        //                     class="decoration-none text-color2 flex hover:text-color4  transition-all duration-600"
        //                     href="#top">Home</a></li>
        //                 <li class="list-none my-3"><a
        //                     class="decoration-none text-color2 flex  hover:text-color4  transition-all duration-600"
        //                     href="#aboutus">About</a></li>
        //                 <li class="list-none my-3"><a
        //                     class="decoration-none text-color2 flex  hover:text-color4 transition-all duration-600"
        //                     href="#tours">Tours</a></li>
        //                 <li class="list-none my-3"><a
        //                     class="decoration-none text-color2 flex  hover:text-color4 transition-all duration-600"
        //                     href="#destinations">Destinations</a></li>
        //                 <li class="list-none my-3"><a
        //                     class="decoration-none text-color2 flex   hover:text-color4  transition-all duration-600"
        //                     href="#blog">Blog</a></li>
        //                 <li class="list-none my-3"><a
        //                     class="decoration-none text-color2 flex   hover:text-color4 transition-all duration-600"
        //                     href="#contacus">Contact</a></li>
        //             </ul>
        //         </nav>
        //     </header> */}
        // </div>
        <>
            <section class="  bg-header  bg-cover bg-no-repeat bg-center bg-color1 bg-blend-multiply bg-opacity-60 ">
                        <section class="w-full flex flex-wrap justify-center ">
                                <header class="w-[85%]  xl:w-[73%]  container hidden lg:flex justify-between h-[60px]  items-center py-[45px] border-b-[1px] border-white border-opacity-40"
                                        id="header">
                                        <figure class="w-[140px]">
                                                <img src={i1} alt="" class="w-[100%]"/>
                                        </figure>
                                        <nav class="h-[100%] md:w-[70%]" id="nav">
                                                <ul class="h-[100%] flex items-center gap-8 justify-end">
                                                        <li class="list-none  "><a
                                                                        class="decoration-none text-white hover:text-color3 transition-all duration-500"
                                                                        href="#top">Home</a></li>
                                                        <li class="list-none"><a
                                                                        class="decoration-none text-white  hover:text-color3 transition-all duration-500"
                                                                        href="#aboutus">About</a></li>
                                                        <li class="list-none "><a
                                                                        class="decoration-none text-white  hover:text-color3 transition-all duration-500"
                                                                        href="#tours">Tours</a></li>
                                                        <li class="list-none"><a
                                                                        class="decoration-none text-white  hover:text-color3 transition-all duration-500"
                                                                        href="#destinations">Destinations</a></li>
                                                        <li class="list-none "><a
                                                                        class="decoration-none text-white  hover:text-color3 transition-all duration-500"
                                                                        href="#blog">Blog</a></li>
                                                        <li class="list-none"><a
                                                                        class="decoration-none text-white  hover:text-color3 transition-all duration-500"
                                                                        href="#contactus">Contact</a></li>
                                                </ul>
                                        </nav>
                                </header>
                                <header id="header"
                                        class="w-[95%] sm:w-[70%] md:w-[80%] container flex h-[60px] justify-between  items-center  lg:hidden  py-[45px] relative border-b-[1px] border-white border-opacity-40 ">
                                        <figure class="w-[140px]">
                                                <img src="img/logo-light.png" alt="" class="w-[100%]"/>
                                        </figure>
                                        <div class=" w-1/2 h-full flex justify-end items-center ">
                                                <i
                                                        class="bi bi-list text-3xl text-white cursor-pointer ham-menu-icon"></i>
                                        </div>
                                        <nav class="menu hidden h-[400px] w-full absolute bg-white left-0 top-[90px]   z-30"
                                                id="nav">
                                                <ul class="h-full w-full flex flex-col  justify-center ms-6">
                                                        <li class="list-none my-3"><a
                                                                        class="decoration-none text-color2 flex hover:text-color4  transition-all duration-600"
                                                                        href="#top">Home</a></li>
                                                        <li class="list-none my-3"><a
                                                                        class="decoration-none text-color2 flex  hover:text-color4  transition-all duration-600"
                                                                        href="#aboutus">About</a></li>
                                                        <li class="list-none my-3"><a
                                                                        class="decoration-none text-color2 flex  hover:text-color4 transition-all duration-600"
                                                                        href="#tours">Tours</a></li>
                                                        <li class="list-none my-3"><a
                                                                        class="decoration-none text-color2 flex  hover:text-color4 transition-all duration-600"
                                                                        href="#destinations">Destinations</a></li>
                                                        <li class="list-none my-3"><a
                                                                        class="decoration-none text-color2 flex   hover:text-color4  transition-all duration-600"
                                                                        href="#blog">Blog</a></li>
                                                        <li class="list-none my-3"><a
                                                                        class="decoration-none text-color2 flex   hover:text-color4 transition-all duration-600"
                                                                        href="#contacus">Contact</a></li>
                                                </ul>
                                        </nav>
                                </header>
                        </section>
                    </section>

                    <section class="w-full flex justify-center bg-color7 py-8 " id="destinations">
                        <div class="w-full container 2xl:px-36">
                                <div>
                                        <p class="text-color4 uppercase px-5">MOST POPULAR</p>
                                        <p class="text-5xl font-secondary text-color3 px-5">Popular <span
                                                        class="text-color1">Destination</span></p>
                                        <div
                                                class="flex flex-wrap justify-center xl:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3 ">
                                                <figure
                                                        class="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000 overflow-hidden group ">
                                                        <img src="img/canada1-1.jpeg" alt=""
                                                                class="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"/>

                                                        <figcaption
                                                                class="absolute text-white bottom-[20px] left-5  group-hover:bottom-[50px]  transition-all duration-700 w-full  ">
                                                                <div
                                                                        class="flex after:contetn-[''] after:h-[1px] after:bg-op-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%]  after:transition-all after:duration-1000">
                                                                        <i
                                                                                class="bi bi-geo-alt text-2xl text-white me-2"></i>
                                                                        <p class="capitalize font-secondary text-3xl">
                                                                                Canada</p>
                                                                </div>
                                                                <div
                                                                        class="flex justify-between absolute  mt-5 w-full  ">
                                                                        <p>Vast & Diverse Location</p>
                                                                        <a href="canada.html"
                                                                                class="flex  me-9 ">Explore<i
                                                                                        class="bi bi-arrow-right"></i></a>
                                                                </div>

                                                        </figcaption>
                                                </figure>
                                                <figure
                                                        class="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000 overflow-hidden group ">
                                                        <img src="img/maldives1-1.jpeg" alt=""
                                                                class="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"/>

                                                        <figcaption
                                                                class="absolute text-white bottom-[20px] left-5  group-hover:bottom-[50px]  transition-all duration-700 w-full  ">
                                                                <div
                                                                        class="flex after:contetn-[''] after:h-[1px] after:bg-op-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%]  after:transition-all after:duration-1000">
                                                                        <i
                                                                                class="bi bi-geo-alt text-2xl text-white me-2"></i>
                                                                        <p class="capitalize font-secondary text-3xl">
                                                                                Maldives</p>
                                                                </div>
                                                                <div
                                                                        class="flex justify-between absolute  mt-5 w-full  ">
                                                                        <p>Tropical Paradise</p>
                                                                        <a href="maldives.html"
                                                                                class="flex  me-9  ">Explore<i
                                                                                        class="bi bi-arrow-right"></i></a>
                                                                </div>

                                                        </figcaption>
                                                </figure>
                                                <figure
                                                        class="w-full md:w-[45%] xl:w-[30%] h-[450px] relative  transition-all duration-1000 overflow-hidden group ">
                                                        <img src="img/italy1.jpeg" alt=""
                                                                class="w-[100%] h-[100%] object-cover group-hover:brightness-75 group-hover:scale-[1.2] absolute transition-all duration-1000"/>

                                                        <figcaption
                                                                class="absolute text-white bottom-[20px] left-5  group-hover:bottom-[50px]  transition-all duration-700 w-full  ">
                                                                <div
                                                                        class="flex after:contetn-[''] after:h-[1px] after:bg-op-50 after:w-[20%] after:bg-white after:absolute after:bottom-[-8px] group-hover:after:w-[90%]  after:transition-all after:duration-1000">
                                                                        <i
                                                                                class="bi bi-geo-alt text-2xl text-white me-2"></i>
                                                                        <p class="capitalize font-secondary text-3xl">
                                                                                Italy</p>
                                                                </div>
                                                                <div
                                                                        class="flex justify-between absolute  mt-5 w-full  ">
                                                                        <p>Contry with Cultural Riches</p>
                                                                        <a href="roma.html" class="flex me-9 ">Explore<i
                                                                                        class="bi bi-arrow-right"></i></a>
                                                                </div>

                                                        </figcaption>
                                                </figure>
                                        </div>
                                </div>
                        </div>
                </section>

                <div className="image-grid">
                        {posts.map(post => (
                            <div className="post" key={post.id}>
                                <img src={post.imageUrl} alt={post.caption} className="post-image" />
                                <div className="post-details">
                                    <h3 className="username">{post.username}</h3>
                                    <p className="caption">{post.caption}</p>
                                    <div className="actions">
                                        <LikeButton />
                                        <CommentButton />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
        </>
    );
}

export default Top3;