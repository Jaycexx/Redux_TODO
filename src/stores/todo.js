const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': 
      return {
          id: action.id,
          text: action.text,
          complete: false,
        };
    case 'TOGGLE_TODO': 
        if(state.id === action.id) {
          return {
            ...state,
            complete: !state.complete,
          };
        }
        return state;
    default: 
      return state;
  }
}

export default todo;