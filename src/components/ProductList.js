import React, { useContext } from 'react';
import _ from 'lodash';
import Product from './Product';
import ProductsContext from '../context/ProductsContext';

const ProductsList = () => {
  const { Products, setProducts } = useContext(ProductsContext);

  const handleRemoveProduct = (id) => {
    setProducts(Products.filter((Product) => Product.id !== id));
  };

  return (
    <React.Fragment>

      <div className="Product-list">
        <input placeholder="Enter Product Title" onChange={event => setQuery(event.target.value)} />

        {
          Product.filter(Product => {
            if (query === '') {
              return Product;
            } else if (Product.ProductCategory.toLowerCase().includes(query.toLowerCase())) {
              return Product;
            }
          }).map((Products, index) => (
            <div className="input-control" key={index}>
              {!_.isEmpty(Products) ? (
                Products.map((Product) => (
                  <Product key={Product.id} {...Product} handleRemoveProduct={handleRemoveProduct} />
                ))
              ) : (
                <p className="message">No Products available. Please add some Products.</p>
              )}
            </div>
          ))
        }

      </div>
    </React.Fragment>
  );
};

export default ProductsList;
