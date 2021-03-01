import React from 'react';
import classNames from 'classnames';
import { useCalculationUpdate } from '../context/CalculationProvider';
import '../css/button.css';

function Button({ specialized, symbol }) {
  const operatorClass = classNames({
    'button-key': true,
    'button-zero': specialized === 'zero',
    'button-operation': specialized === 'operation',
  });

  const calculationUpdate = useCalculationUpdate()

  return (
    <button className={operatorClass} onClick={() => calculationUpdate(symbol)}>
      {symbol}
    </button>
  );
}

export default Button;
