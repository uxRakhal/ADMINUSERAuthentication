import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login/user');
  }
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const path = window.location.pathname;
      const pathArray = path.split('/');
      const id = pathArray.pop(); 
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

      const path = window.location.pathname;
      const pathArray = path.split('/');
      const id = pathArray.pop(); 
      useEffect(()=>  {
      axios
           .get(`/users/${id}`)
           .then(res => setUser(res.data.name))
           .catch(err => console.error(err));
  });
      
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login/user');
    return null;
  };

  return (
    <div>
      <h1>Welcome to Dashboard, {user}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
};

export default UserDashboard;
