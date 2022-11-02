import React from "react";

function Button(props) {
  return (
    <button className={props.className} id={props.id} onClick={props.onClick}>
      {props.content}
    </button>
  );
}

export default Button;
