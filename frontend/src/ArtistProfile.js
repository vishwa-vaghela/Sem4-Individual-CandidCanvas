import { React, useState, useEffect } from "react";
import axios from "axios";
import './Profile.css';
import { useParams } from "react-router-dom";
import ProfileGrid from "./ProfileGrid";
import Navbar from "./Navbar";

function ArtistProfile() {
    const { username } = useParams();
    const actual_user=localStorage.getItem('username');

    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [profile_img, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [posts, setPosts] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false); // Follow state

    const data = { 'username': username };
    const handleDownload = async (imageUrl, imageName) => {
    try {
      // Fetch the image as a Blob
      const response = await fetch(imageUrl, {
        mode: 'cors', // Ensure CORS is handled properly
      });
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = imageName || 'download';
      
      // Append to the document and click the link to download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

    useEffect(() => {
        // Fetch user details from the backend
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/fetch-user-details/', data);

                setBio(response.data.bio);
                setProfileImage(response.data.profile_img);
                setFollowers(response.data.followers);
                setFollowing(response.data.following);
                setPosts(response.data.count);

                // Check if the user is already following
                const storedFollowState = localStorage.getItem(`isFollowing_${username}`);
                if (storedFollowState) {
                    setIsFollowing(JSON.parse(storedFollowState));
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [username]);

    const handleClick = async () => {
        // Toggle follow/unfollow state
        const newFollowState = !isFollowing;
        setIsFollowing(newFollowState);

        // Update followers count
        if (newFollowState) {
            setFollowers(followers + 1); // Increment followers
        } else {
            setFollowers(followers - 1); // Decrement followers
        }

        // Persist follow state in localStorage
        localStorage.setItem(`isFollowing_${username}`, JSON.stringify(newFollowState));

        // API call to update followers in the backend
        try {
            const response = await axios.post('http://127.0.0.1:8000/update-followers/', {
                username: username,
                action: newFollowState ? 'follow' : 'unfollow' // Specify the action
            });
            console.log(response.data.message);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
        <Navbar user={actual_user}/>
            <div className='container'>
                <div className='upper1'>
                    <img src={profile_img} className='profile-pic' alt="Profile" />
                    
                    <table>
                        <tbody>
                            <tr>
                                <td>{posts}</td>
                                <td>{followers}</td>
                                <td>{following}</td>
                            </tr>
                            <tr>
                                <td>Posts</td>
                                <td>Followers</td>
                                <td>Following</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='upper2'>
                <div className='username'>{username}</div>
                    <p className='bio'>{bio}</p>
                    <button className='follow-button' onClick={handleClick}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                </div>

                <div>
                    <ProfileGrid username={username} />
                </div>
            </div>
        </>
    );
}

export default ArtistProfile;
