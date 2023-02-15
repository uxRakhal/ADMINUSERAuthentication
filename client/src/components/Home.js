import React from 'react';
import { Link } from 'react-router-dom';

function Home(){

      return(
<>
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
      </>
      )}


      export default Home;