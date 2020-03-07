export const initialState = {
  isEditTask: false,
  currentTask: null,
  trigger: null
}

export const types = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_EDIT_TASK: 'TOGGLE_EDIT_TASK',
  TOGGLE_TASK_DETAILS: 'TOGGLE_TASK_DETAILS',
  SET_CURRENT_TASK: 'SET_CURRENT_TASK',
  TRIGGER: 'TRIGGER'
}

// export function init(initialState) {
//   return {
//     ...initialState
//   }
// }

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_TASK:
      return { ...state }

    case types.TOGGLE_EDIT_TASK:
      console.log(state)
      return { 
        ...state,
        isEditTask: !state.isEditTask
      }

    case types.TRIGGER:
      const trig = !state.trigger
      return { 
        ...state,
        trigger: action.payload
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