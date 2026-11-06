// Action Types
export const INPUT_DIGIT = 'INPUT_DIGIT';
export const SET_OPERATOR = 'SET_OPERATOR';
export const CALCULATE = 'CALCULATE';
export const CLEAR = 'CLEAR';
export const DELETE = 'DELETE';
export const TOGGLE_SIGN = 'TOGGLE_SIGN';
export const PERCENTAGE = 'PERCENTAGE';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';

// Action Creators
export const inputDigit = (digit) => ({ type: INPUT_DIGIT, payload: digit });
export const setOperator = (op) => ({ type: SET_OPERATOR, payload: op });
export const calculate = () => ({ type: CALCULATE });
export const clear = () => ({ type: CLEAR });
export const deleteDigit = () => ({ type: DELETE });
export const toggleSign = () => ({ type: TOGGLE_SIGN });
export const percentage = () => ({ type: PERCENTAGE });
export const clearHistory = () => ({ type: CLEAR_HISTORY });