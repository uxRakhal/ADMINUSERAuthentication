import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginUser from './components/LoginUser';
import SignupUser from './components/SignupUser';
import LoginAdmin from './components/LoginAdmin';
import SignupAdmin from './components/SignupAdmin';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ChangePassword from './components/ChangePassword';
import Home from './components/Home';


function App() {

  return (
    <Router> 
      <Routes>
      <Route exact path="/" element={<Home />} />  
      <Route path='/login/user' element={<LoginUser />} />
      <Route path='/signup/user' element={<SignupUser />} />
      <Route path='/login/admin' element={<LoginAdmin />} />
      <Route path='/signup/admin' element={<SignupAdmin />} />
      <Route path='/dashboard/admin/:id' element={<AdminDashboard />} />
      <Route  path='/dashboard/user/:id' element={<UserDashboard />} />
      <Route  path='/changepassword/user/:id' element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
