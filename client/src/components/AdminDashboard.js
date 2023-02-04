import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AdminDashboard = () => {
const [users, setUsers] = useState([]);
const [admins, setAdmins] = useState([]);
let admin
  
    useEffect(() => {
      axios
        .get('http://localhost:5000/users')
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login/admin');
    }

  const handleDelete = (userId) => {
      axios
        .delete(`/users/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== userId));
        })
        .catch(err => console.error(err));
    };

    const handleDeleteAdmin = async () => {
      
      try {
        await axios.delete(`/admin/${id}`);
        window.alert('Admin deleted successfully');
        localStorage.removeItem('token');
        navigate('/login/admin');
      } catch (error) {
        console.error(error);
      } 
    };

    const {id} = useParams();

      useEffect(()=>  {
      
        axios.get(`http://localhost:5000/admin/${id}`)
        .then(res => setAdmins(res.data))
        .catch(err => console.error(err));
        
  });
  
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login/admin');
    return null;
  };

  
  return (
      <div>
        <div>
        <h1> Welcome To Admin Panel, {admins} </h1>
        </div>
      <ul>
        {Array.isArray(users) ? users.map(user => (
          <li key={user._id}>
            ({user.name})&nbsp;({user.email})
            &nbsp;
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        )) : <p> No users are present </p>}
      </ul>
      <br/>
      <button onClick={() => handleLogout}>Logout</button>
      <br/>
      <button onClick={() => handleDeleteAdmin(admin._id)}>Delete Admin</button>
      </div>
    );
    

  };
    

export default AdminDashboard;