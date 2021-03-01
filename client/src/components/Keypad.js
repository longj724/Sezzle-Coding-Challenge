import React from 'react';
import Button from './Button.js';
import '../css/keypad.css';

function Keypad() {

  return (
    <div className="keypad-outline">
      <div className="keypad-container">
        <Button color="aquamarine" symbol="C" />
        <Button color="blue" symbol="del" />
        <Button color="orange" specialized="operation" symbol="^" />
        <Button specialized="operation" color="green" symbol="/" />

        <Button color="yellow" symbol="7" />
        <Button color="yellow" symbol="8" />
        <Button color="yellow" symbol="9" />
        <Button specialized="operation" color="yellow" symbol="*" />

        <Button color="yellow" symbol="4" />
        <Button color="yellow" symbol="5" />
        <Button color="yellow" symbol="6" />
        <Button specialized="operation" color="yellow" symbol="+" />

        <Button color="yellow" symbol="1" />
        <Button color="yellow" symbol="2" />
        <Button color="yellow" symbol="3" />
        <Button specialized="operation" color="yellow" symbol="-" />

        <Button specialized="zero" symbol="0" />
        <Button symbol="." />
        <Button specialized="operation" symbol="=" />
      </div>
    </div>
  );
}

export default Keypad;
