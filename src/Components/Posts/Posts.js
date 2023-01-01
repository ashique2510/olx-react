import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/firebaseContext';
import { PostContext } from '../../store/PostContext';
import './Post.css';

function Posts() {
  const [loading, setLoading] = useState(false)
  const { db } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(() => {
    let unsubscribed = false;
    setLoading(true)
    getDocs(collection(db, "products"))
      .then((querySnapshot) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        const newUserDataArray = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));

        setProducts(newUserDataArray)
        setLoading(false)
      })
      .catch((err) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        // TODO: Handle errors
        console.error("Failed to retrieve data", err);
      });

    return () => unsubscribed = true;

  }, [])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        {
          loading ? 
            <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className='spinner'> <SyncLoader color={'#D0021B'} loading={loading} size={10} /></div>
          </div>
        </div> :
            <div className="cards">
              {products.map(data => {
                console.log(data.name);
                console.log(data.url);

                return <div
                  className="card" onClick={() => {
                    setPostDetails(data)
                    navigate('/post')
                  }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>

                  <div className="image">
                    <img src={data.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {data.price}</p>
                    <span className="kilometer">{data.category}</span>
                    <p className="name"> {data.name}</p>
                  </div>

                  <div className="date">
                    <span>{data.createdAt}</span>
                  </div>
                </div>
              })}
            </div>

        }

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div>

            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
