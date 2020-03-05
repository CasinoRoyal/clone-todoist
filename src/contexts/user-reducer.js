export const initialState = {
  isLogged: false,
  token: null,
  user: null,
  currentProject: null,
  isEditTask: false,
  currentTask: null
}

export const types = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  SET_TOKEN: 'SET_TOKEN',
  ADD_PROJECT: 'ADD_PROJECT',
  SET_PROJECT: 'SET_PROJECT',
  EDIT_PROJECT: 'EDIT_PROJECT',
  REMOVE_PROJECT: 'REMOVE_PROJECT',
  ADD_TASK: 'ADD_TASK',
  TOGGLE_EDIT_TASK: 'TOGGLE_EDIT_TASK',
  TOGGLE_TASK_DETAILS: 'TOGGLE_TASK_DETAILS',
  SET_CURRENT_TASK: 'SET_CURRENT_TASK'
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
    case types.SET_PROJECT:
      return {
        ...state,
        currentProject: action.payload
      }
    case types.ADD_TASK:
      return { ...state }
    case types.TOGGLE_EDIT_TASK:
      return { 
        ...state,
        isEditTask: !state.isEdit
      }
    case types.SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload
      }
    case types.ADD_PROJECT:
    default: 
      return state;
  }
};