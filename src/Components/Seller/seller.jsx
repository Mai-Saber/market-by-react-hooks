import React, { useState, useEffect } from "react";
import * as Api from "../../Services/Products.json";
import Button from "../../Common/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./seller.css";
import { Col, Row } from "react-bootstrap";
import FixedNav from "../FixedNav/FixedNav";
import AddBox from "../../Common/AddBox";

function Seller(props) {
  const [products, setProducts] = useState([]);

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
      {/* /// */}
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
          <Col xs={9}>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Id</th>
                  <th>Product Color </th>
                  <th>Product price </th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          <Col xs={3}>
            <Button
              className=" btn btn-primary addButton"
              content="Add Product"
              onClick={handleAddProduct}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Seller;
