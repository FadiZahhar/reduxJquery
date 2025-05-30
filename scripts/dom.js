function renderTasks() {
  const { tasks, loading, error } = store.getState();
  const $list = $('#taskList');
  $list.empty();

  if (loading) return $list.append('<li>Loading...</li>');
  if (error) return $list.append(`<li class="w3-text-red">Error: ${error}</li>`);

  tasks.forEach((task, i) => {
    $list.append(`
      <li>
        ${task}
        <button class="delete-btn w3-button w3-red w3-small w3-right" data-index="${i}">X</button>
      </li>
    `);
  });
}

function setupUI() {
  const $input = $('#taskInput');

  $('#addTaskBtn').on('click', () => {
    const task = $input.val().trim();
    if (task) {
      store.dispatch(addTask(task));
      $input.val('');
    }
  });

  $('#taskList').on('click', '.delete-btn', function () {
    const index = $(this).data('index');
    store.dispatch(deleteTask(index));
  });

  store.subscribe(renderTasks);
}
