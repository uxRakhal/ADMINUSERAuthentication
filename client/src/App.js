import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginUser from './components/LoginUser';
import SignupUser from './components/SignupUser';
import LoginAdmin from './components/LoginAdmin';
import SignupAdmin from './components/SignupAdmin';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';



function App() {

  return (
    <Router>
      <div className="App">
      
      <button>
      <Link to='/login/user' >Login as User</Link>
      </button>
      <br />
      <button>
      <Link to='/login/admin' >Login as Admin</Link>
      </button>
      <br />
      <button>
      <Link to='/signup/user' >Signup as User</Link>
      </button>
      <br />
      <button>
      <Link to='/signup/admin' >Signup as Admin</Link>
      </button>
      <br />
      
      <Routes>
      <Route path='/login/user' element={<LoginUser />} />
      <Route path='/signup/user' element={<SignupUser />} />
      <Route path='/login/admin' element={<LoginAdmin />} />
      <Route path='/signup/admin' element={<SignupAdmin />} />
      <Route path='/dashboard/admin/:id' element={<AdminDashboard />} />
      <Route path='/dashboard/user/:id' element={<UserDashboard />} />
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;
