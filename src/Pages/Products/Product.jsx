import React from "react";
import ProductList from "../../Products/ProductList";
import "./Product.css";

const Products = () => {
  return (
    <>
  <div className="product-con">
  <div className="SearchCon">
  <input type="text" id="searchBar" />
  
    </div>
  
        {ProductList.map((product, index) => (
          <div className="con" key={product.id || index}>
            <div className="thumbnail">
              <img src={product.Assets} alt={product.title} />
            </div>
            <div className="product-detail">
              <p className="title">{product.title}</p>
              <p className="description">{product.description}</p>
              <div className="btns">
                <button>See</button>
                <button className="bucket-btn">Add To Bucket</button>
              </div>
            </div>
          </div>
        ))}
  </div>
  </>
  );
};

export default Products;
