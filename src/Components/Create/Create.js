import React, { Fragment, useContext, useRef, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/firebaseContext'; 
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { HashLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {storage,db} = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const nameRef = useRef()
  const categoryRef = useRef()
  const priceRef = useRef()
  const [image,setImage] = useState(null)
  const date = new Date()
  const handleSubmit=()=>{
    const name = nameRef.current.value;
    const category = categoryRef.current.value;
    const price = priceRef.current.value;
    try {
      setIsLoading(true)
      const storageRef = ref(storage,`/image/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef,image);
      uploadTask.on('state_changed',(snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },(error) => {
        // Handle unsuccessful uploads
        console.log(error.message);
      },() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          addDoc(collection(db,'products'),{
            name:name,
            category:category,
            price:price,
            url:downloadURL,
            userId:user.uid,
            createdAt:date.toDateString()
          })
        });
        setIsLoading(true)
        navigate('/')
      }
      )
      
    } catch (error) {
      
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        {
          isLoading? <div className='spinner'><HashLoader color={'#D0021B'} loading={isLoading} size={150} /></div>:<div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            ref={nameRef}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            ref={categoryRef}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" ref={priceRef} type="number" id="fname" name="Price" />
          <br />

        <br />
        <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image):''}></img>

          <br />
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

      </div>
        }
      </card>
    </Fragment>
  );
};

export default Create;
