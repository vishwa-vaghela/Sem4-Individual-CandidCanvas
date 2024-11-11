import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Profile from './Profile';
import Home from './Home';
import Login from './Login';
import ArtistProfile from './ArtistProfile';
import AboutUs from './AboutUs';
import Trending from './Trending';
import Search from './Search';

var count = 0;
function App() {
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to='/'></Link>
          </li>
          <li>
            <Link to='/profile'></Link>
          </li>
          <li>
            <Link to='/login'></Link>
          </li>
          <li>
            <Link to='/artist-profile'></Link>
          </li>
          <li>
            <Link to='/aboutus'></Link>
          </li>
          <li>
            <Link to='/trending'></Link>
          </li>
          <li>
            <Link to='/search'></Link>
          </li>
        </ul>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/artist-profile/:username' element={<ArtistProfile />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/trending' element={<Trending />}></Route>
          <Route path='/search/' element={<Search/>}></Route>
        </Routes>
      </Router>
      {/* <Profile/> */}
      {/* <Home/> */}
      {/* <Footer/> */}
      {/* <Login/> */}
      {/* <Trending/> */}
      {/* <CarouselOne/> */}
      {/* <CarouselThree/> */}
      {/* <Top3/> */}
      {/* <Ab/> */}
      {/* <Grid/> */}
    </div>
  );
}

export default App;
