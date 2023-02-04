import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const navigate = useNavigate();
  
  
    const handleSubmit = (e) => {
      e.preventDefault();

      axios
      .post('http://localhost:5000/login/user', { email, password })
      .then(res => {
      try {
        const data = res.data;
        localStorage.setItem('token', data.token);
        const id = res.data.id;
        navigate(`/dashboard/user/${id}`);
      } catch (err) {
        console.error("Invalid email or password");
      }});
    };
  
    return (
      <div>
          <form onSubmit={handleSubmit}>
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
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide Password" : "Show Password"}
            </button>
            <br />
            <button type="submit">Login</button>
          </form>
      </div>
    );
  }


export default LoginUser