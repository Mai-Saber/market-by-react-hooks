import React, { useState, useEffect } from "react";
import * as Api from "../../Services/Products.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Buyer.css";
import { Col, Row } from "react-bootstrap";
import FixedNav from "../FixedNav/FixedNav";

function Buyer(props) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [prices, setPrices] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setProducts(Api.default);
  }, []);

  const handleCart = ({ price, item }) => {
    cartItems.push(item);
    setCartItems(cartItems);
    console.log(cartItems);
    prices.push(price);
    const initialValue = 0;
    const totalPrice = prices.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    setTotalPrice(totalPrice);
  };
  return (
    <>
      <FixedNav />

      <div className="content buyer">
        <Row>
          <Col xs={12} xl={7}>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Id</th>
                  <th>Product Color </th>
                  <th>Product price </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productName}</td>
                    <td>{product.productId}</td>
                    <td>
                      {product.productColor.map((ele) => (
                        <p key={ele.colorName}>
                          <span>{ele.colorName}</span>
                        </p>
                      ))}
                    </td>
                    <td>
                      {product.productColor.map((ele) => (
                        <p key={ele.colorPrice}>
                          <span>{ele.colorPrice}</span>
                        </p>
                      ))}
                    </td>
                    <td>
                      {product.productColor.map((ele) => (
                        <p key={ele.colorPrice}>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              handleCart({
                                price: ele.colorPrice,
                                item: ele.colorName + " " + product.productName,
                              })
                            }
                          >
                            Buy
                          </button>
                        </p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          {cartItems.length > 0 && (
            <Col xs={12} xl={4}>
              <div className="shoppingCart">
                <h4> Hello in your Shopping Cart</h4>
                <div className="cartItems">
                  <p> 1- your cart include : </p>
                  {cartItems.map((ele) => (
                    <ul key={ele}>
                      <li>{ele}</li>
                    </ul>
                  ))}
                </div>
                <div>
                  2- The total price of the products you have purchased ={" "}
                  {totalPrice} LE
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default Buyer;
