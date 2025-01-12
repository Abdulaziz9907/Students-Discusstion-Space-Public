import './Account_search_results.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import FooterNav from '../../../components/assests/FooterNav/FooterNav';
import asr_logo3 from './elements/Vector3.png';
import asr_logo4 from './elements/Vector4.png';
import asr_logo5 from './elements/Vector5.png';
import asr_logo6 from './elements/Vector6.png';
import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { ToastContainer, toast, Flip } from 'react-toastify';
import axios from 'axios';
import { ring2 } from 'ldrs';

ring2.register();

function Account_search_results() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUserName = (location.state && location.state.userName) || '';
  const [userName, setUserName] = useState(initialUserName);
  const [searchTerm, setSearchTerm] = useState(initialUserName);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const { userName: currentUserName } = useContext(UserContext);
  console.log(currentUserName + " account in mainpage ");

  // Fetch the users when `searchTerm` changes
  useEffect(() => {
    const fetchUsers = async () => {
      // Allow fetching all users for admin when searchTerm is empty
      if (searchTerm || currentUserName === 'admin') {
        setLoading(true);
        setNoResults(false);
        try {
          const response = await axios.get('https://students-discussion-space.onrender.com/users', {
            params: { userName: searchTerm },
          });
          setResults(response.data);
          console.log('users: ', response.data);
  
          if (response.data.length === 0) {
            setNoResults(true);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          setResults([]);
          setNoResults(true);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchUsers();
  }, [searchTerm, currentUserName]);




  const handleDeleteClick = async (userName) => {
    if (userName === 'admin') {
      toast.error('Admin user cannot be deleted', {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Flip,
      });
      return;
    }
  
    console.log("Attempting to delete user with userName:", userName);
    try {
      const response = await fetch(`https://students-discussion-space.onrender.com/delete-account/${userName}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
      console.log("Response from server:", data);
      if (response.ok) {
        toast.success('User deleted successfully', {
          position: 'top-right',
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Flip,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error while deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };
  

  const handleSearchInput = (e) => {
    setUserName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(userName);
    }
  };

  const handleViewDetails = (userName) => {
    navigate('/Account info', { state: { userName } });
  };

  return (
    <div className="asr_body">
      <ToastContainer />
      <div id="asr_items">
        <div>
          <Navbar />
        </div>
        <div>
        <p id="asr_text">Search Results For: {searchTerm ? searchTerm : "all"}</p>
        </div>

        <div className="asr_search-container">
          <input
            type="text"
            placeholder="Type to search by username..."
            className="asr_search-bar"
            value={userName}
            onChange={handleSearchInput}
            onKeyDown={handleSearchSubmit}
          />
        </div>
      </div>

      <img src={asr_logo3} alt="comp1" id="asr_Vec3" className="asr_LogImage" />
      <img src={asr_logo4} alt="comp1" id="asr_Vec4" className="asr_LogImage" />
      <img src={asr_logo5} alt="comp1" id="asr_Vec5" className="asr_LogImage" />
      <img src={asr_logo6} alt="comp1" id="asr_Vec6" className="asr_LogImage" />

      <div id="asr_results_full">
        <div id="asr_results_container">
          <div id="asr_results">
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
            ) : noResults ? (
              <p id="asr_text" className="asr_notfound_text">
                Sorry, we couldn't find anything for: "{searchTerm}"
              </p>
            ) : results.length > 0 ? (
              results.map((result, index) => (
                <div key={index} id={`asr_result`}>
                  <span className={`asr_result-text`}>
                    {`${index + 1} - ${result}`}
                  </span>
                  <div id="asr_btns">
                    {currentUserName === 'admin' && (
                      <button className="asr_Delete-button" onClick={() => handleDeleteClick(result)}>
                        Delete User
                      </button>
                    )}
                    <button
                      className="asr_result-button"
                      onClick={() => handleViewDetails(result)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account_search_results;
