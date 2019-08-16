import React from 'react';

function Button(props) {
  const { onClick, className, disabled, children } = props;
  return (
    <button
      type="button"
      onClick={ onClick }
      disabled={ disabled }
      className={ className }
    >
      { children }
    </button>
  )
}

export default Button;

