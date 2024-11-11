import React, { useEffect, useState } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProfileGrid from './ProfileGrid';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Profile() {

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [profile_img, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [count,setCount]=useState(0);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle the form submission with image upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description) {
      alert('Please provide a file and description');
      return;
    }

    // Create FormData object to send the file and data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('description', description);
    formData.append('image', file); // Append the selected image file

    try {
      // Send the request to the Django backend
      const response = await axios.post('http://127.0.0.1:8000/upload-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);  // Log the response
      setShowForm(false); // Close the form after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Fetch user data only when the username is not null/undefined
  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/fetch-user-details/', { 'username': username });

          setBio(response.data.bio);
          setProfileImage(response.data.profile_img);
          setFollowers(response.data.followers);
          setFollowing(response.data.following);
          setCount(response.data.count);
          setPosts(response.data.posts);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchData();
    }
  }, [username]);

  if (username !== 'null' && username !== 'undefined') {
    return (
      <>
      <Navbar user={username}/>
        <div className='container'>
          <div className='upper1'>
            <img src={profile_img} className='profile-pic' alt="Profile" />
            
            <table>
              <tbody>
                <tr>
                  <td>{count}</td>
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
          <div className='username1'>{username}</div>
            <p className='bio'>{bio}</p>
            <button className='add-post' onClick={() => setShowForm(true)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>

            {showForm && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setShowForm(false)}>&times;</span>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>Upload File:</label>
                      <br />
                      <input type="file" accept='image/*' onChange={handleFileChange} />
                    </div>
                    <div>
                      <label>Description:</label>
                      <textarea value={description} onChange={handleDescriptionChange} rows={7} />
                    </div>
                    <button type="submit" style={{ color: 'black' }}>Submit</button>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div>
            <ProfileGrid username={username} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className='nouser'>
        <h2>No user found, Please log in!!!</h2>
        <button onClick={() => { navigate('/login') }}>Login</button>
      </div>
    );
  }
}

export default Profile;
