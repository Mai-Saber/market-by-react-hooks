import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

function AddBox(props) {
  return (
    <div>
      <div className="addBox" id="addBox">
        <h1>Add Product</h1>
        <Input
          type="text"
          placeholder="name"
          name="productName"
          value={props.productName}
          onChange={props.handleChange}
        />
        <Input
          type="text"
          placeholder="color1"
          name="firstColor"
          value={props.firstColor}
          onChange={props.handleChange}
        />
        <Input
          type="number"
          placeholder="firstPrice"
          name="firstPrice"
          value={props.firstPrice}
          onChange={props.handleChange}
        />
        <Input
          type="text"
          placeholder="secondColor"
          name="secondColor"
          value={props.secondColor}
          onChange={props.handleChange}
        />
        <Input
          type="number"
          placeholder="secondPrice"
          name="secondPrice"
          value={props.secondPrice}
          onChange={props.handleChange}
        />
        <Button
          content="Submit"
          className="btn btn-primary"
          id="submit"
          onClick={props.handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddBox;
