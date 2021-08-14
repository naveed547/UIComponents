import React from 'LibApp/react';
const Button = ({name, onClick, ...others}) => (
  <button onClick={onClick} {...others}>{`UIComponent Button ${name || ''}`}</button>
);
export default Button;