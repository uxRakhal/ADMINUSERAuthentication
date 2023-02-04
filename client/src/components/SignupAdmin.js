import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignupAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [adminKey, setAdminKey] = useState('');

    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        window.alert('Passwords do not match');
      } else{
  
      // Here you can send the email and password to the server
      axios.post('http://localhost:5000/signup/admin', { name, email, password, adminKey })
        .then(res => {
          const data = res.data;
          localStorage.setItem('token', data.token);
          console.log(data);
          const id = data.id;
          navigate(`/dashboard/admin/${id}`);
        })
        .catch(err => {
          console.log(err);
          alert('Invalid email or password');
        });
    };
  }

    return (
      <div>
          <form onSubmit={handleSubmit}>
          <label>
             name:
              <input
                type="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br/>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
             </label>
             &nbsp;
             <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide Password" : "Show Password"}
      </button>
            <br />
            <label>
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              </label>
            <br />
            <label>
              Admin Key
              <input type="string"
              name="adminKey"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              required
              />
              </label>
              <br />
            <button type="submit">Signup</button>
          </form>
      </div>
    );
  }
  
  export default SignupAdmin;
  

  