import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import Post from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/firebaseContext'
import Poster from './store/PostContext'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const { setUser } = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
    });
  })
  return (
    <div>
      <Poster>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/post' element={<Post />} />
        </Routes>
      </Poster>



    </div>
  );
}

export default App;
