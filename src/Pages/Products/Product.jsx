import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../_Auth/Firebase";
import "./Product.css";
import BtnLoader from '../../Components/BtnLoaders/Btnloaders';

const Products = () => {
  const [isLoader, setLoader] = useState(true);
  const [productList, setProductList] = useState([]);
  const [isInitialized, setInitialized] = useState(false);

  const db = getFirestore(app);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user.uid);
      }
      setInitialized(true); 
    });
  }, []);

  const fetchData = async (userId) => {
    if (!userId) {
      console.error("Invalid userId:", userId);
      return;
    }

    try {
      const docRef = doc(db, "ProductList", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProductList(docSnap.data().ProductList || []);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error.message);
    } finally {
      setLoader(false);
    }
  };

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <div className="product-con">
          <div className="searchCon">
            <input type="text" id="searchBar" placeholder="Search..." />
            <div className="Btn">
              <button>Search</button>
              <button className="bucket-btn">Bucket</button>
            </div>
          </div>
          {productList.map((product, index) => (
            <div className="con" key={product.id || index}>
              <div className="thumbnail">
                {product.Assets ? (
                  <img src={product.Assets} alt={product.title} />
                ) : (
                  <div className="thumbnailError">Error</div>
                )}
              </div>
              <div className="product-detail">
                <p className="Title">{product.title || "No Title"}</p>
                <p className="description">
                  {product.description || "No Description"}
                </p>
                <div className="btns">
                  <button>See</button>
                  <button className="bucket-btn">Add To Bucket</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
