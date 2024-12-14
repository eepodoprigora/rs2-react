import { useReducer } from "react";

export function useToggle(values = [true, false]) {
  const reducer = (state, action) => {
    if (action !== undefined) {
      return action;
    }

    const index = values.indexOf(state);
    return values[(index + 1) % values.length];
  };

  const [state, dispatch] = useReducer(reducer, values[0]);

  const toggle = (value) => dispatch(value);

  return [state, toggle];
}
