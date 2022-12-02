import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
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
  const [newProduct, setNewProduct] = useState({
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
    const obj = {
      name: item,
      price: price,
      id: cartItems.length + 1,
      quantity: 1,
    };
    // add to cart //
    cartItems.push(obj);
    setCartItems(cartItems);

    // handle quantity//
    for (let i = 0; i < cartItems.length - 1; i++) {
      const ele = cartItems[i];
      if (ele.name === item) {
        ele.quantity += 1;
        cartItems.pop();
        setCartItems(cartItems);
      }
    }
    // handle price///
    prices.push(price);
    const initialValue = 0;
    const totalPrice = prices.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    setTotalPrice(totalPrice);
  };
  const handleAddProduct = () => {
    document.getElementById("addButton").style.display = "none";
    document.getElementById("addBox").style.display = "block";
    document.getElementById("addBox").scrollIntoView({ behavior: "smooth" });
    setNewProduct({
      productName: "",
      firstColor: "",
      firstPrice: "",
      secondColor: "",
      secondPrice: "",
    });
  };
  const handleSubmit = (e) => {
    const obj = {
      productName: newProduct.productName,
      productId: products.length + 1,
      productColor: [
        { colorName: newProduct.firstColor, colorPrice: newProduct.firstPrice },
        {
          colorName: newProduct.secondColor,
          colorPrice: newProduct.secondPrice,
        },
      ],

      
    };
    if (obj.productName.trim() === "") {
      e.preventDefault();
      toast.error("Product Name can't be empty :(");
    } else {
      document.getElementById("addBox").style.display = "none";
      document.getElementById("addButton").style.display = "block";
      setNewProduct(products.push(obj));

      toast.success("this item has been added ");
    }
  };
  const handleChange = (e) => {
    const newAccountState = {
      ...newProduct,
      [e.target.name]: e.target.value,
    };
    setNewProduct(newAccountState);
  };
  const handleCancel = () => {
    document.getElementById("addBox").style.display = "none";
    document.getElementById("addButton").style.display = "block";
  };
  const handleClearCart = () => {
    setCartItems([]);
    setTotalPrice("");
  };

  return (
    <>
      <FixedNav />

      <AddBox
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        productName={newProduct.productName}
        firstColor={newProduct.firstColor}
        firstPrice={newProduct.firstPrice}
        secondColor={newProduct.secondColor}
        secondPrice={newProduct.secondPrice}
      />
      {/* /// */}
      <div className="content">
        {sessionStorage.getItem("role") === "seller" && (
          <Row className="header">
            <Col xs={7} xl={9}>
              <h3>
                Hello Admin, these are the products that are in your market
              </h3>
            </Col>
            <Col xs={5} xl={3}>
              <Button
                id="addButton"
                className=" btn btn-primary addButton"
                content="Add Product"
                onClick={handleAddProduct}
              />
            </Col>
          </Row>
        )}

        <Row>
          <Col
            xs={12}
            xl={sessionStorage.getItem("role") === "seller" ? 12 : 7}
          >
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  {sessionStorage.getItem("role") === "seller" && (
                    <th>Product Id</th>
                  )}

                  <th>Product Color </th>
                  <th>Product price </th>
                  {sessionStorage.getItem("role") === "buyer" && <th> </th>}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productId} id={"row" + product.productId}>
                    <td>{product.productName}</td>
                    {sessionStorage.getItem("role") === "seller" && (
                      <td>{product.productId}</td>
                    )}
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
                          <span>{ele.colorPrice} </span>
                        </p>
                      ))}
                    </td>
                    {sessionStorage.getItem("role") === "buyer" && (
                      <td>
                        {product.productColor.map((ele) => (
                          <p key={ele.colorPrice}>
                            <button
                              className="btn btn-primary"
                              title="Add to cart"
                              onClick={() =>
                                handleCart({
                                  price: ele.colorPrice,
                                  item:
                                    ele.colorName + " " + product.productName,
                                })
                              }
                            >
                              <i className="ri-shopping-cart-fill"></i>
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

          {sessionStorage.getItem("role") === "buyer" && (
            <Col xs={12} xl={4}>
              <div className="shoppingCart" id="shoppingCart">
                <h4> Hello in your Shopping Cart</h4>
                <p> 1- your cart include : </p>
                <div className="cartItems">
                  {cartItems.map((ele) => (
                    <ul key={ele.id}>
                      <li>
                        <span>-{ele.name} </span>
                        <span>{ele.price} LE</span>
                        <span>{ele.quantity + "x"}</span>
                      </li>
                    </ul>
                  ))}
                </div>
                <div>
                  2- total=
                  {" " + totalPrice} LE
                </div>
                <button
                  className="btn btn-danger clear"
                  onClick={handleClearCart}
                >
                  {" "}
                  Clear Cart{" "}
                </button>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default Product;
