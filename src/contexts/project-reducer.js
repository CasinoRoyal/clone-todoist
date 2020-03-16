export const initialState = {
  currentProject: null,
  projects: [],
}

export const types = {
  GET_PROJECTS: 'GET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  SET_PROJECT: 'SET_PROJECT',
  EDIT_PROJECT: 'EDIT_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_PROJECTS:
      return {
        ...state,
        projects: [...action.payload]
      }
    case types.ADD_PROJECT:
      return {
        ...state,
        // projects: [
        //   ...state.projects,
        //   action.payload
        // ]
      }
    case types.SET_PROJECT:
      return {
        ...state,
        currentProject: action.payload
      }
    case types.DELETE_PROJECT:
      return {
        ...state,
        currentProject: null,
        projects: [...action.payload]
      }
    default: 
      return state;
  }
};