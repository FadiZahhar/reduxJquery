// Initial state
const initialState = {
    tasks: []
};

// Reducer
function taskReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return { tasks: [...state.tasks, action.payload] };
        case 'DELETE_TASK':
            return { tasks: state.tasks.filter((task, i) => i !== action.payload) };
        default:
            return state;
    }
}

// Create Redux store
const store = Redux.createStore(taskReducer);

function addTask(task) {
    store.dispatch({ type: 'ADD_TASK', payload: task });
}

function deleteTask(index) {
    store.dispatch({ type: 'DELETE_TASK', payload: index });
}

$(document).ready(function () {
    // Render tasks
    function renderTasks() {
        const { tasks } = store.getState();
        $('#taskList').empty();
        tasks.forEach((task, index) => {
            $('#taskList').append(`
                <li>
                    ${task} <button class="delete-btn" data-index="${index}">Delete</button>
                </li>
            `);
        });
    }

    // Subscribe render function to store changes
    store.subscribe(renderTasks);

    // Add task event
    $('#addTaskBtn').on('click', function () {
        const task = $('#taskInput').val().trim();
        if (task) {
            addTask(task);
            $('#taskInput').val('');
        }
    });

    // Delete task event (delegation)
    $('#taskList').on('click', '.delete-btn', function () {
        const index = $(this).data('index');
        deleteTask(index);
    });

    // Initial render
    renderTasks();
});