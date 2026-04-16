import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumberClick = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (prevValue, currentValue, op) => {
    switch (op) {
      case '+':
        return prevValue + currentValue;
      case '-':
        return prevValue - currentValue;
      case '×':
        return prevValue * currentValue;
      case '÷':
        return prevValue / currentValue;
      case '%':
        return prevValue % currentValue;
      default:
        return currentValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{display}</div>
        
        <div className="buttons">
          <button className="btn btn-function" onClick={handleClear}>AC</button>
          <button className="btn btn-function" onClick={handleSign}>+/-</button>
          <button className="btn btn-function" onClick={handlePercentage}>%</button>
          <button className="btn btn-operator" onClick={() => handleOperation('÷')}>÷</button>

          <button className="btn" onClick={() => handleNumberClick(7)}>7</button>
          <button className="btn" onClick={() => handleNumberClick(8)}>8</button>
          <button className="btn" onClick={() => handleNumberClick(9)}>9</button>
          <button className="btn btn-operator" onClick={() => handleOperation('×')}>×</button>

          <button className="btn" onClick={() => handleNumberClick(4)}>4</button>
          <button className="btn" onClick={() => handleNumberClick(5)}>5</button>
          <button className="btn" onClick={() => handleNumberClick(6)}>6</button>
          <button className="btn btn-operator" onClick={() => handleOperation('-')}>-</button>

          <button className="btn" onClick={() => handleNumberClick(1)}>1</button>
          <button className="btn" onClick={() => handleNumberClick(2)}>2</button>
          <button className="btn" onClick={() => handleNumberClick(3)}>3</button>
          <button className="btn btn-operator" onClick={() => handleOperation('+')}>+</button>

          <button className="btn btn-zero" onClick={() => handleNumberClick(0)}>0</button>
          <button className="btn" onClick={handleDecimal}>.</button>
          <button className="btn btn-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
