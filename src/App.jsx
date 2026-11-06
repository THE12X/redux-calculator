import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  inputDigit,
  setOperator,
  calculate,
  clear,
  deleteDigit,
  toggleSign,
  percentage,
  clearHistory
} from './Action';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { currentValue, previousValue, operator, history } = useSelector((state) => state);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        dispatch(inputDigit(e.key));
      } else if (e.key === '+') {
        dispatch(setOperator('+'));
      } else if (e.key === '-') {
        dispatch(setOperator('-'));
      } else if (e.key === '*') {
        dispatch(setOperator('×'));
      } else if (e.key === '/') {
        e.preventDefault();
        dispatch(setOperator('÷'));
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        dispatch(calculate());
      } else if (e.key === 'Backspace') {
        dispatch(deleteDigit());
      } else if (e.key === 'Escape') {
        dispatch(clear());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <div className="calc-container">
      <div className="calc-card">
        {/* Header */}
        <div className="calc-header">
          <div className="brand-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00fff1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6"/>
              <line x1="16" y1="14" x2="16" y2="18"/>
              <path d="M16 10h.01"/>
              <path d="M12 10h.01"/>
              <path d="M8 10h.01"/>
              <path d="M12 14h.01"/>
              <path d="M8 14h.01"/>
              <path d="M12 18h.01"/>
              <path d="M8 18h.01"/>
            </svg>
            <span className="brand-title">REDUX CORE</span>
          </div>
          <button 
            className="history-toggle-btn"
            onClick={() => setShowHistory(!showHistory)}
            title="Toggle History"
          >
            📜
          </button>
        </div>

        {/* Display Screen */}
        <div className="calc-screen">
          <div className="formula-display">
            {previousValue} {operator}
          </div>
          <div className="main-display">{currentValue}</div>
        </div>

        {/* Keypad Grid */}
        <div className="keypad">
          <button className="btn btn-func" onClick={() => dispatch(clear())}>AC</button>
          <button className="btn btn-func" onClick={() => dispatch(deleteDigit())}>⌫</button>
          <button className="btn btn-func" onClick={() => dispatch(toggleSign())}>±</button>
          <button className="btn btn-op" onClick={() => dispatch(setOperator('÷'))}>÷</button>

          <button className="btn" onClick={() => dispatch(inputDigit('7'))}>7</button>
          <button className="btn" onClick={() => dispatch(inputDigit('8'))}>8</button>
          <button className="btn" onClick={() => dispatch(inputDigit('9'))}>9</button>
          <button className="btn btn-op" onClick={() => dispatch(setOperator('×'))}>×</button>

          <button className="btn" onClick={() => dispatch(inputDigit('4'))}>4</button>
          <button className="btn" onClick={() => dispatch(inputDigit('5'))}>5</button>
          <button className="btn" onClick={() => dispatch(inputDigit('6'))}>6</button>
          <button className="btn btn-op" onClick={() => dispatch(setOperator('-'))}>-</button>

          <button className="btn" onClick={() => dispatch(inputDigit('1'))}>1</button>
          <button className="btn" onClick={() => dispatch(inputDigit('2'))}>2</button>
          <button className="btn" onClick={() => dispatch(inputDigit('3'))}>3</button>
          <button className="btn btn-op" onClick={() => dispatch(setOperator('+'))}>+</button>

          <button className="btn" onClick={() => dispatch(percentage())}>%</button>
          <button className="btn" onClick={() => dispatch(inputDigit('0'))}>0</button>
          <button className="btn" onClick={() => dispatch(inputDigit('.'))}>.</button>
          <button className="btn btn-equals" onClick={() => dispatch(calculate())}>=</button>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="history-panel">
            <div className="history-header">
              <span>Calculation History</span>
              <button className="clear-hist-btn" onClick={() => dispatch(clearHistory())}>Clear</button>
            </div>
            {history.length === 0 ? (
              <p className="no-history">No history yet</p>
            ) : (
              <ul className="history-list">
                {history.map((item, idx) => (
                  <li key={idx} className="history-item">
                    <span className="hist-expr">{item.expression} =</span>
                    <span className="hist-res">{item.result}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;