import { React, useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './ProfileGrid.css';
import axios from "axios";

function ProfileGrid({ username }) {
  const [posts, setPosts] = useState([]);
  const [isNew, setIsNew] = useState('');
  const [liked, setLiked] = useState({});
  const [lastLikedPhotoId, setLastLikedPhotoId] = useState(null);

  // Toggle liked state and update likes count for existing users
  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.photo_id === postId
          ? { ...post, likes: liked[postId] ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );

    setLiked(prevLiked => {
      const newLikedState = {
        ...prevLiked,
        [postId]: !prevLiked[postId],
      };

      localStorage.setItem('likedPosts', JSON.stringify(newLikedState));

      if (!prevLiked[postId]) {
        setLastLikedPhotoId(postId);
      } else {
        setLastLikedPhotoId(null);
      }

      return newLikedState;
    });
  };
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
    async function fetchImages() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/fetch-images-for-user/', { 'username': username });
        setIsNew(response.data.is_new_user);
        setPosts(response.data.images);

        const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        const initialLikedState = response.data.images.reduce((acc, post) => {
          acc[post.photo_id] = savedLikedPosts[post.photo_id] || false;
          return acc;
        }, {});

        setLiked(initialLikedState);
      } catch (err) {
        console.log(err);
      }
    }
    fetchImages();
  }, [username]);

  useEffect(() => {
    if (lastLikedPhotoId) {
      const updateData = async () => {
        const response = await axios.post('http://127.0.0.1:8000/update-likes/', { 'id': lastLikedPhotoId });
        console.log(response);
      };
      updateData();
    }
  }, [lastLikedPhotoId]);

  // Rendering for new users' images
  if (isNew === 'true') {
    return (
      <div className="img-container">
        {posts.map(post => (
          <div className="box">
            <img src={post.photo_image_url} alt={post.description} />
            <div className="caption">{post.description}</div>
          </div>
        ))}
      </div>
    );
  }

  // Rendering for existing users' images (with like functionality)
  return (
    <div className='img-container'>
      {posts.map(post => (
        <div className="box" key={post.photo_id}>
          <img src={post.photo_image_url} alt={post.caption} />
          <div className="overlay">
            <div className="actions">
              <div onClick={() => handleLike(post.photo_id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '15px', color: 'white', marginRight: '3px' }}>{post.likes}</span>
                {liked[post.photo_id] ? (
                  <AiFillHeart style={{ color: 'red' }} />
                ) : (
                  <AiOutlineHeart style={{ color: 'white' }} />
                )}
              </div>
              <button className="save-button" onClick={() => handleDownload(post.photo_image_url, post.caption || `image_${post.photo_id}`)}>
                  Download
                </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileGrid;
