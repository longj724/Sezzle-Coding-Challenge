import React from 'react';
import { useCalculation } from '../context/CalculationProvider';
import '../css/screen.css';

function Screen() {
  const calculation = useCalculation();

  return (
    <div className="screen-calculation">
      {calculation}
    </div>
  )
}

export default Screen;
