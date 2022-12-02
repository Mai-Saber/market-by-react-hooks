import React from "react";
import Button from "./Button";
import TextField from "../../node_modules/@mui/material/TextField";
import { Row, Col } from "react-bootstrap";

function AddBox(props) {
  return (
    <div className="addBox" id="addBox">
      <h1>Add Product</h1>
      <Row>
        <Col xs={12} xl={4} className="col">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Product Name"
            name="productName"
            value={props.productName}
            onChange={props.handleChange}
          />
        </Col>
        <Col xs={12} xl={4} className="col">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="First Color"
            name="firstColor"
            value={props.firstColor}
            onChange={props.handleChange}
          />
        </Col>
        <Col xs={12} xl={4} className="col">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            label="First Price"
            name="firstPrice"
            value={props.firstPrice}
            onChange={props.handleChange}
          />
        </Col>
        <Col xs={12} xl={4} className="col">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Second Color"
            name="secondColor"
            value={props.secondColor}
            onChange={props.handleChange}
          />
        </Col>
        <Col xs={12} xl={4} className="col">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            label="Second Price"
            name="secondPrice"
            value={props.secondPrice}
            onChange={props.handleChange}
          />
        </Col>
      </Row>
      <div className="buttons">
        <Button
          content="Submit"
          className="btn btn-primary"
          id="submit"
          onClick={props.handleSubmit}
        />
        <Button
          content="Cancel"
          className="btn btn-danger"
          id="cancel"
          onClick={props.handleCancel}
        />
      </div>
    </div>
  );
}

export default AddBox;
