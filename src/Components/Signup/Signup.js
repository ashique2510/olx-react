import React, { useState,useContext } from 'react';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { addDoc,collection } from 'firebase/firestore';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/firebaseContext';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';


export default function Signup() {
  
  
  const navigate = useNavigate()
  const [loading,setLoading] =useState(false)
  const [username,setUsername] = useState('')
  const [email,setEamil] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const {auth,db} =useContext(FirebaseContext)
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const user = await createUserWithEmailAndPassword(auth,email,password);
      console.log(user.user);
      const updatename = await updateProfile(auth.currentUser,{displayName:username})
      console.log(updatename);
      const data = await addDoc(collection(db,'users'),{
        id:user.user.uid,
        username:username,
        phone:phone
      })
      setLoading(false)
      navigate('/')
    } catch (error) {
      console.log(error.message);
      
    }
    
  }
  return (
    <div>
      { loading? <div className='spinner'><HashLoader color={'#D0021B'} loading={loading} size={150} /></div>
        :<div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEamil(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a><Link to={'/login'}>Login</Link></a>
      </div>
      }
    </div>
  );
}
