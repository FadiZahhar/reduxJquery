function setLoading() {
  return { type: 'SET_LOADING' };
}

function setTasks(tasks) {
  return { type: 'SET_TASKS', payload: tasks };
}

function setError(error) {
  return { type: 'SET_ERROR', payload: error };
}

function addTask(task) {
  return { type: 'ADD_TASK', payload: task };
}

function deleteTask(index) {
  return { type: 'DELETE_TASK', payload: index };
}
