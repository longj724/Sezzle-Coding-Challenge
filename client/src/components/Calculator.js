import React from 'react';
import Keypad from './Keypad';
import Screen from './Screen';
import '../css/calculator.css';

function Calculator() {
  return (
    <div className="calculator-container">
      <Screen />
      <Keypad />
    </div>
  );
}

export default Calculator;
