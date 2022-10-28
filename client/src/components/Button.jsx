import React from 'react';

import styles from '../styles';

const Button = ({title, handleClick, restStyles}) => {
  return (
    <button
      type='button'
      className={`${styles.btn} ${restStyles}`}
      onClick={handleClick}
    >{title}</button>
  )
}

export default Button