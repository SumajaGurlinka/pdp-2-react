import { createContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import { cloneDeep } from "lodash";

const Store = createContext({});

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, cloneDeep(initialState));

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export { Store, StateProvider };
