export const initialState = {
  currentProject: null,
  projects: [],
}

export const types = {
  GET_PROJECTS: 'GET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  SET_PROJECT: 'SET_PROJECT',
  EDIT_PROJECT: 'EDIT_PROJECT',
  REMOVE_PROJECT: 'REMOVE_PROJECT',
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
    default: 
      return state;
  }
};