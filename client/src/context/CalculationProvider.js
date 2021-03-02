import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useUser } from './UserProvider';
import { evaluate } from 'mathjs';

const CalculationContext = createContext();
const CalculationUpdateContext = createContext();
const CalculationListContext = createContext();

export function useCalculation() {
  return useContext(CalculationContext);
}

export function useCalculationUpdate(symbol) {
  return useContext(CalculationUpdateContext);
}

export function useCalculationList() {
  return useContext(CalculationListContext);
}

function CalculationProvider({ children }) {
  const [curCalc, setCurCalc] = useState('0');
  const [isReset, setIsReset] = useState(true);
  const [calcList, setCalcList] = useState([]);
  const user = useUser();

  const addCalculationToList = useCallback(
    (calc) => {
      setCalcList((prevCalcList) => {
        // Check if 10 calculations are showing
        if (prevCalcList.length === 10) {
          // Remove last transaction
          const removeLast = prevCalcList.slice(0, -1);
          const newCalcList = [calc, ...removeLast];
          localStorage.setItem('calcList', JSON.stringify(newCalcList));

          return newCalcList;
        }
        const newCalcList = [calc, ...prevCalcList];
        localStorage.setItem('calcList', JSON.stringify(newCalcList));

        return newCalcList;
      });
    },
    [setCalcList]
  );

  // Get transactions from local storage
  useEffect(() => {
    const calculations = JSON.parse(localStorage.getItem('calcList'));

    // Check for calculations in local storage
    if (calculations !== null) {
      setCalcList(calculations);
    }
  }, []);

  // Setup socket to receive calculations
  useEffect(() => {
    if (user === undefined || user['socket'] === undefined) return;

    user['socket'].on('display-calculation', addCalculationToList);

    return () => {
      user['socket'].off('display-calculation');
    };
  }, [user, addCalculationToList]);

  const updateCalculation = (symbol) => {
    if (symbol === 'C') {
      setCurCalc('0');
      setIsReset(true);
    } else if (symbol === 'del') {
      const newCalc = curCalc.slice(0, -1);
      setCurCalc(newCalc);
    } else if (symbol === '=') {
      try {
        const result = evaluate(curCalc).toString();
        sendCalculation(curCalc, result);
        setCurCalc(result);
      } catch (error) {
        setCurCalc('Syntax Error');
      }
    } else {
      let newCalc = '';

      // Check if start of a new series of calculations
      if (isReset) {
        newCalc = symbol;
        setIsReset(false);
      } else {
        newCalc = curCalc + symbol;
      }
      setCurCalc(newCalc);
    }
  };

  const sendCalculation = (equation, result) => {
    user['socket'].emit('calculation', {
      equation: equation,
      result: result,
      name: user['name'],
    });
  };

  return (
    <CalculationContext.Provider value={curCalc}>
      <CalculationUpdateContext.Provider value={updateCalculation}>
        <CalculationListContext.Provider value={calcList}>
          {children}
        </CalculationListContext.Provider>
      </CalculationUpdateContext.Provider>
    </CalculationContext.Provider>
  );
}

export default CalculationProvider;
