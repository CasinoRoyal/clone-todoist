export const initialState = {
  isEditTask: false,
  currentTask: null
}

export const types = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_EDIT_TASK: 'TOGGLE_EDIT_TASK',
  TOGGLE_TASK_DETAILS: 'TOGGLE_TASK_DETAILS',
  SET_CURRENT_TASK: 'SET_CURRENT_TASK'
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
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
      
    default: 
      return state;
  }
};