import React from 'react';

import './Button.css';

const Button = props => (
  <button
    className="Button"
    disabled={props.disabled || props.loading}
    onClick={props.onClick}
  >
    {props.loading && <div className="Button-loading" />}
    <span className="Button-text">
      {props.children}
    </span>
  </button>
);

export default Button;
