export const initialState = {
  tasks: [],
  isEditTask: false,
  currentTask: null,
  passTask: null
}

export const types = {
  GET_TASKS: 'GET_TASKS',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_EDIT_TASK: 'TOGGLE_EDIT_TASK',
  TOGGLE_TASK_DETAILS: 'TOGGLE_TASK_DETAILS',
  SET_CURRENT_TASK: 'SET_CURRENT_TASK',
  PASS_TASK: 'PASS_TASK'
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {

    case types.GET_TASKS:
      return { 
        ...state,
        tasks: [ ...action.payload ]
      }
 
    case types.ADD_TASK:
    case types.DELETE_TASK:
      return { ...state }

    case types.TOGGLE_EDIT_TASK:
      return { 
        ...state,
        isEditTask: !state.isEditTask
      }

    case types.PASS_TASK:
      return { 
        ...state,
        passTask: action.payload
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