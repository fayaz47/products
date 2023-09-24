import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const ProductForm = (props) => {
  const [Product, setProduct] = useState(() => {
    return {
      Productname: props.Product ? props.Product.Productname : '',
      description: props.Product ? props.Product.description : '',
      special: props.Product ? props.Product.special : '',
      price: props.Product ? props.Product.price : '',
      date: props.Product ? props.Product.date : ''
    };
  });

  const [errorMsg, setErrorMsg,query, setQuery] = useState('');
  const { Productname, author, price, quantity } = Product;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [Productname, author, price, quantity];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const Product = {
        id: uuidv4(),
        Productname,
        description,
        price,
        special,
        date: new Date()
      };
      props.handleOnSubmit(Product);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'special':
        if (value === '' || value === true) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setProduct((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
      <Form.Group controlId="name">
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="ProductCategory"
            value={Productname}
            placeholder="Enter name of Product Category"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="Productname"
            value={Productname}
            placeholder="Enter name of Product"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Product Desription</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="description"
            value={description}
            placeholder="Enter description of product"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="special">
          <Form.Label>Special</Form.Label>
          <Form.Control
            className="input-control-special"
            type="checkbox"
            name="special"
            value={special}
            placeholder="Please enable Checkbox if its Special"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of Product"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
