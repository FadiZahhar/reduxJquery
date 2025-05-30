// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null
};

// Reducer
function taskReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: true, error: null };
    case 'SET_TASKS': return { ...state, tasks: action.payload, loading: false };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'ADD_TASK': return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK': return { ...state, tasks: state.tasks.filter((_, i) => i !== action.payload) };
    default: return state;
  }
}

// Store
const store = Redux.createStore(taskReducer);
