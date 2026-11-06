const initialState = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  overwrite: false,
  history: []
};

const compute = (a, b, op) => {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);
  if (isNaN(num1) || isNaN(num2)) return '';

  let result = 0;
  switch (op) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '×':
    case '*': result = num1 * num2; break;
    case '÷':
    case '/': 
      if (num2 === 0) return 'Error';
      result = num1 / num2; 
      break;
    default: return '';
  }

  return Math.round(result * 1e8) / 1e8;
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_DIGIT': {
      const digit = action.payload;

      if (digit === '.' && state.currentValue.includes('.')) return state;

      if (state.overwrite) {
        return {
          ...state,
          currentValue: digit === '.' ? '0.' : digit,
          overwrite: false
        };
      }

      if (state.currentValue === '0' && digit !== '.') {
        return { ...state, currentValue: digit };
      }

      return {
        ...state,
        currentValue: `${state.currentValue}${digit}`
      };
    }

    case 'SET_OPERATOR': {
      const op = action.payload;

      if (state.currentValue === 'Error') return state;

      if (state.previousValue == null) {
        return {
          ...state,
          operator: op,
          previousValue: state.currentValue,
          overwrite: true
        };
      }

      if (state.overwrite) {
        return {
          ...state,
          operator: op
        };
      }

      const res = compute(state.previousValue, state.currentValue, state.operator);

      return {
        ...state,
        previousValue: res === 'Error' ? null : res.toString(),
        currentValue: res.toString(),
        operator: op,
        overwrite: true
      };
    }

    case 'CALCULATE': {
      if (state.operator == null || state.previousValue == null || state.overwrite) {
        return state;
      }

      const res = compute(state.previousValue, state.currentValue, state.operator);
      const expression = `${state.previousValue} ${state.operator} ${state.currentValue}`;

      if (res === 'Error') {
        return {
          ...initialState,
          currentValue: 'Error',
          history: state.history
        };
      }

      return {
        ...state,
        currentValue: res.toString(),
        previousValue: null,
        operator: null,
        overwrite: true,
        history: [{ expression, result: res.toString() }, ...state.history].slice(0, 10)
      };
    }

    case 'CLEAR':
      return {
        ...initialState,
        history: state.history
      };

    case 'DELETE': {
      if (state.overwrite || state.currentValue === 'Error') {
        return { ...state, currentValue: '0', overwrite: false };
      }
      if (state.currentValue.length === 1) {
        return { ...state, currentValue: '0' };
      }
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1)
      };
    }

    case 'TOGGLE_SIGN': {
      if (state.currentValue === '0' || state.currentValue === 'Error') return state;
      return {
        ...state,
        currentValue: (parseFloat(state.currentValue) * -1).toString()
      };
    }

    case 'PERCENTAGE': {
      if (state.currentValue === 'Error') return state;
      return {
        ...state,
        currentValue: (parseFloat(state.currentValue) / 100).toString()
      };
    }

    case 'CLEAR_HISTORY':
      return { ...state, history: [] };

    default:
      return state;
  }
};