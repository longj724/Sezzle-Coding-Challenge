import React from 'react';
import CalculationProvider from './context/CalculationProvider';
import UserProvider from './context/UserProvider';
import ChangeName from './components/ChangeName';
import RecentCalculations from './components/RecentCalculations';
import Calculator from './components/Calculator';
import './css/app.css';

function App() {
  return (
    <UserProvider>
      <CalculationProvider>
        <div className="app">
          <div className="app-userInfo">
            <ChangeName />
            <RecentCalculations />
          </div>
          <Calculator />
        </div>
      </CalculationProvider>
    </UserProvider>
  );
}

export default App;
