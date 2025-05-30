function fetchTasks() {
  store.dispatch(setLoading());

  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos?_limit=5',
    method: 'GET',
    success: function (data) {
      const titles = data.map(task => task.title);
      store.dispatch(setTasks(titles));
    },
    error: function (_, __, errorThrown) {
      store.dispatch(setError(errorThrown));
    }
  });
}
