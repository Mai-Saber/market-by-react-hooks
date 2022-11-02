import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Api from "../../Services/Products.json";
import FixedNav from "../FixedNav/FixedNav";
import AddBox from "../../Common/AddBox";
import Button from "../../Common/Button";
import "./Product.css";

function Product(props) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [prices] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [account, setAccount] = useState({
    productName: "",
    firstColor: "",
    firstPrice: "",
    secondColor: "",
    secondPrice: "",
  });
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
  const handleAddProduct = () => {
    document.getElementById("addBox").style.display = "block";
    setAccount({
      productName: "",
      firstColor: "",
      firstPrice: "",
      secondColor: "",
      secondPrice: "",
    });
  };
  const handleSubmit = (e) => {
    const obj = {
      productName: account.productName,
      productId: products.length + 1,
      productColor: [
        { colorName: account.firstColor, colorPrice: account.firstPrice },
        {
          colorName: account.secondColor,
          colorPrice: account.secondPrice,
        },
      ],
    };
    if (obj.productName.trim() === "") {
      e.preventDefault();
    } else {
      document.getElementById("addBox").style.display = "none";
      setAccount(products.push(obj));
    }
  };
  const handleChange = (e) => {
    const newAccountState = {
      ...account,
      [e.target.name]: e.target.value,
    };
    setAccount(newAccountState);
    console.log(account);
  };
  return (
    <>
      <FixedNav />

      <AddBox
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        productName={account.productName}
        firstColor={account.firstColor}
        firstPrice={account.firstPrice}
        secondColor={account.secondColor}
        secondPrice={account.secondPrice}
      />
      {/* /// */}
      <div className="content">
        <Row>
          <Col xs={7}>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Id</th>
                  <th>Product Color </th>
                  <th>Product price </th>
                  {sessionStorage.getItem("role") === "buyer" && <th> </th>}
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
                    {sessionStorage.getItem("role") === "buyer" && (
                      <td>
                        {product.productColor.map((ele) => (
                          <p key={ele.colorPrice}>
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                handleCart({
                                  price: ele.colorPrice,
                                  item:
                                    ele.colorName + " " + product.productName,
                                })
                              }
                            >
                              Buy
                            </button>
                          </p>
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>

          {sessionStorage.getItem("role") === "buyer" ? (
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
          ) : (
            <Col xs={3}>
              <Button
                className=" btn btn-primary addButton"
                content="Add Product"
                onClick={handleAddProduct}
              />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default Product;
