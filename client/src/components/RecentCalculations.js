import React from 'react';
import { useCalculationList } from '../context/CalculationProvider';
import '../css/recentCalculations.css';

function RecentCalculations() {
  const calculationList = useCalculationList();

  return (
    <div>
      <h2 className="recentCalculations-title">Recent Calculations</h2>
      <ul className="recentCalculations-list">
        {calculationList.map((calculation) => {
          return (
            <li className="recentCalculations-listItem">
              <div className="recentCalculations-content">
                <span>{calculation['equation'] + ' = ' + calculation['result']}</span>
                <p className="recentCalculations-name">{'Calculated by: ' + calculation['name']}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecentCalculations;
