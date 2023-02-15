import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login/user');
  }
  const {id} = useParams();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      
      
      await axios.delete(`/users/${id}`);
      window.alert('User deleted successfully');
      localStorage.removeItem('token');
      navigate('/login/user');
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

      
      useEffect(()=>  {
      axios
           .get(`http://localhost:5000/users/${id}`)
           .then(res => setUser(res.data.name))
           .catch(err => console.error(err));
  });
      
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login/user');
    return null;
  };

  const changePassword = () => {
    
    navigate(`/changepassword/user/${id}`)
  }


  return (
    <div>
      <h1>Welcome to Dashboard, {user}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>
      <br/>
      <button onClick={changePassword}>Change Password</button>

    </div>
  );
};

export default UserDashboard;
