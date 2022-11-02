import React from "react";

function Input(props) {
  return (
    <input
      type={props.type}
      className={props.className}
      id={props.id}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default Input;
