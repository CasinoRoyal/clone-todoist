export const initialState = {
  isLogged: false,
  token: null,
  user: null,
  projects: null,
  logout: () => {}
}

export const types = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  SET_TOKEN: 'SET_TOKEN',
  ADD_PROJECT: 'ADD_PROJECT',
  EDIT_PROJECT: 'EDIT_PROJECT',
  REMOVE_PROJECT: 'REMOVE_PROJECT'
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        isLogged: true,
        token: action.payload.token,
        user: action.payload.user,
        projects: action.payload.projects
      }
    case types.LOGOUT_USER: 
      return {
        ...state,
        isLogged: false,
        token: null,
        user: null,
        projects: null
      }
    case types.ADD_PROJECT:
      return {
        ...state,
        projects: action.payload
      }
    default: 
      return state;
  }
};