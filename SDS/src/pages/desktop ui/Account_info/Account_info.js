import React, { useState, useEffect } from 'react';
import './Account_info.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import DeleteBtn from '../../../components/assests/DeleteBtn/DeleteBtn';
import axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import account_logo3 from './elements/Vector3.png';
import account_logo4 from './elements/Vector4.png';
import account_logo5 from './elements/Vector5.png';
import account_logo6 from './elements/Vector6.png';
import { Navigate } from 'react-router-dom';
import { ring2 } from 'ldrs';
ring2.register();

function Account_info() {
  const location = useLocation();
  const userName = location.state?.userName || ''; 
  const navigate = useNavigate();

  console.log(userName + " account");

  const [fields, setFields] = useState({
    username: { value: userName, isEditing: false },
    firstName: { value: '', isEditing: false },
    lastName: { value: '', isEditing: false },
    major: { value: '', isEditing: false },
    level: { value: 0, isEditing: false },
    password: { value: '', isEditing: false },
    ratings: { value: 0, isEditing: false },
    questions: { value: 0, isEditing: false },
    answers: { value: 0, isEditing: false },
    files: { value: 0, isEditing: false },
    discussions: { value: 0, isEditing: false },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');




  const handleDeleteClick = async (userName) => {
    console.log("Attempting to delete user with admin account: ", userName);
      try {
        const response = await fetch(`https://students-discussion-space.onrender.com/delete-account/${userName}`, {
          method: "DELETE",
        });

        const data = await response.json();
        console.log("Response from server:", data);
        if (response.ok) {
          
          toast.success('user deleted successfully', {
            position: 'top-right',
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Flip,
          });
          setTimeout(() => {
            navigate('/Account search results');
          }, 1300); 
          
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error while deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    };



  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userName) {
        console.log('User name is not defined. Skipping fetch...');
        setLoading(false);
        return;
      }

      console.log('Fetching user details with username:', userName);

      try {
        const response = await axios.get('https://students-discussion-space.onrender.com/user', {
          params: { userName },
        });
        console.log('Response from server:', response.data);

        if (response?.data) {
          setFields({
            username: { value: userName, isEditing: false },
            firstName: { value: response.data.fName || '', isEditing: false },
            lastName: { value: response.data.lName || '', isEditing: false },
            major: { value: response.data.major || '', isEditing: false },
            level: { value: response.data.year || '', isEditing: false },
            password: { value: response.data.password || '', isEditing: false },
            ratings: { value: response.data.ratings || 0, isEditing: false },
            questions: { value: response.data.questions || 0, isEditing: false },
            answers: { value: response.data.answers || 0, isEditing: false },
            files: { value: response.data.files || 0, isEditing: false },
            discussions: { value: response.data.discussions || 0, isEditing: false },
          });
        }

        setLoading(false);
      } catch (err) {
        console.error('Error occurred while fetching user details:', err);

        if (err.response) {
          console.error('Error response data:', err.response.data);
        }

        setError('Failed to load user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userName]);



  const handleInputChange = (field, event) => {
    setFields((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], value: event.target.value },
    }));
  };



  return (
    <div className="account_body">
      <ToastContainer />
      <Navbar />
        <p id="account_text">Account</p>
      {loading ? (
        <div className="loading-container">
          
          <l-ring-2
            size="70"
            stroke="9"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="white"
          ></l-ring-2>
          
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
        <p id="account_text">Account details</p>

      <img src={account_logo3} alt="comp1" id="account_Vec3" className="account_LogImage" />
      <img src={account_logo4} alt="comp1" id="account_Vec4" className="account_LogImage" />
      <img src={account_logo5} alt="comp1" id="account_Vec5" className="account_LogImage" />
      <img src={account_logo6} alt="comp1" id="account_Vec6" className="account_LogImage" />


        <div id="account_details_container">
          
          
        <div id="account_details">
          <div>
            <p id="account_text2">Personal Info</p>
      
            <div id="account_details1">
              <form id="account-details-form">
                {/* Username */}
                <div id="account_details_list" className="account_underline">
                  <label htmlFor="account_username">Username:</label>
                  <input
                    type="text"
                    id="account_username"
                    name="account_username"
                    value={fields.username.value}
                    onChange={(e) => handleInputChange('username', e)}
                    readOnly={!fields.username.isEditing}
                    className={fields.username.isEditing ? 'editable' : ''}
                  />
                </div>
      
                {/* First Name */}
                <div id="account_details_list" className="account_underline">
                  <label htmlFor="account_first-name">First Name:</label>
                  <input
                    type="text"
                    id="account_first-name"
                    name="account_first-name"
                    value={fields.firstName.value}
                    onChange={(e) => handleInputChange('firstName', e)}
                    readOnly={!fields.firstName.isEditing}
                    className={fields.firstName.isEditing ? 'editable' : ''}
                  />
    
                </div>
      
                {/* Last Name */}
                <div id="account_details_list" className="account_underline">
                  <label htmlFor="account_last-name">Last Name:</label>
                  <input
                    type="text"
                    id="account_last-name"
                    name="account_last-name"
                    value={fields.lastName.value}
                    onChange={(e) => handleInputChange('lastName', e)}
                    readOnly={!fields.lastName.isEditing}
                    className={fields.lastName.isEditing ? 'editable' : ''}
                  />
      
                </div>
      
                {/* Major */}
                <div id="account_details_list" className="account_underline">
                  <label htmlFor="account_major">Major:</label>
                  <input
                    type="text"
                    id="account_major"
                    name="account_major"
                    value={fields.major.value}
                    onChange={(e) => handleInputChange('major', e)}
                    readOnly={!fields.major.isEditing}
                    className={fields.major.isEditing ? 'editable' : ''}
                  />
      
                </div>
      
                {/* Level */}
                <div id="account_details_list" className="account_underline">
                  <label htmlFor="account_level">Level:</label>
                  <input
                    type="text"
                    id="account_level"
                    name="account_level"
                    value={fields.level.value}
                    onChange={(e) => handleInputChange('level', e)}
                    readOnly={!fields.level.isEditing}
                    className={fields.level.isEditing ? 'editable' : ''}
                  />
          
                </div>
      
                {/* Password */}
                <div id="account_details_list">
                  <label htmlFor="account_password">Password:</label>
                  <input
                    type="text"
                    id="account_password"
                    name="account_password"
                    value={fields.password.value}
                    onChange={(e) => handleInputChange('password', e)}
                    readOnly={!fields.password.isEditing}
                    className={fields.password.isEditing ? 'editable' : ''}
                  />
             
                </div>
      
                
              </form>
            </div>
          </div>
      
          {/* Contributions Section */}
          <div>
            <p id="account_text2">Contributions</p>
            <div id="account_details2">
              <div id="account_details_list" className="account_underline">
                <label htmlFor="account_ratings">{fields.ratings.value} rating/s</label>
              </div>
              <div id="account_details_list" className="account_underline">
                <label htmlFor="account_questions">{fields.questions.value} question/s</label>
              </div>
              <div id="account_details_list" className="account_underline">
                <label htmlFor="account_answers">{fields.answers.value} answer/s</label>
              </div>
              <div id="account_details_list" className="account_underline">
                <label htmlFor="account_files">{fields.files.value} file/s uploaded</label>
              </div>
              <div id="account_details_list">
                <label htmlFor="account_discussions">{fields.discussions.value} discussion/s</label>
              </div>
            </div>
      
            <span id="account_delete_btn">
          
            <button className="sr_Delete-button" onClick={() => handleDeleteClick(userName)}>Delete user</button>

              
            </span>
          </div>
        </div>
      </div>
      </>
      )}
      
    </div>
    
  );
}

export default Account_info;
