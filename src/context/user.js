import * as React from 'react'

export const userContext = React.createContext()

function userReducer(state, action) {
    switch (action.type) {
      case 'login': {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
          };
      } 
      case 'register' :{
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
          };
      }
      case 'logout': {
        localStorage.clear();
        return {
            ...state,
            user: null
          };
      }


      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }


const initialState = {
    user: null,
    token: null,
};



export default function UserProvider({children}) {
    const [state, dispatch] = React.useReducer(userReducer, initialState)
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, dispatch}
    return <userContext.Provider value={value}>{children}</userContext.Provider>
  }