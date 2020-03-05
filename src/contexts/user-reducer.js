export const initialState = {
  isLogged: false,
  token: null,
  user: null
}

export const types = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  SET_TOKEN: 'SET_TOKEN'
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        isLogged: true,
        token: action.payload.token,
        user: action.payload.user,
      }
    case types.LOGOUT_USER: 
      return {
        ...state,
        isLogged: false,
        token: null,
        user: null
      }
    default: 
      return state;
  }
};