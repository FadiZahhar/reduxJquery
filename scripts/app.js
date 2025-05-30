// Initial state
const initialState = {
    tasks: [],
    loading: false,
    error: null
};

// Reducer
function taskReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: true, error: null };
        case 'SET_TASKS':
            return { ...state, tasks: action.payload, loading: false };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };

        // ✅ Add support for task modification
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter((_, i) => i !== action.payload) };

        default:
            return state;
    }
}

// Create store (no middleware needed)
const store = Redux.createStore(taskReducer);

// Dispatchers
function addTask(task) {
    store.dispatch({ type: 'ADD_TASK', payload: task });
}

function deleteTask(index) {
    store.dispatch({ type: 'DELETE_TASK', payload: index });
}

function fetchTasks() {
    store.dispatch({ type: 'SET_LOADING' });

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos?_limit=5',
        method: 'GET',
        success: function (data) {
            const titles = data.map(task => task.title);
            store.dispatch({ type: 'SET_TASKS', payload: titles });
        },
        error: function (_, __, errorThrown) {
            store.dispatch({ type: 'SET_ERROR', payload: errorThrown });
        }
    });
}

// jQuery DOM logic
$(function () {
    const $list = $('#taskList');
    const $input = $('#taskInput');

    function render() {
        const { tasks, loading, error } = store.getState();
        $list.empty();

        if (loading) return $list.append('<li>Loading...</li>');
        if (error) return $list.append(`<li class="w3-text-red">Error: ${error}</li>`);

        tasks.forEach((task, i) => {
            $list.append(`<li>
                ${task}
                <button class="delete-btn w3-button w3-red w3-small w3-right" data-index="${i}">X</button>
            </li>`);
        });
    }

    store.subscribe(render);

    $('#addTaskBtn').click(() => {
        const task = $input.val().trim();
        if (task) {
            addTask(task);
            $input.val('');
        }
    });

    $list.on('click', '.delete-btn', function () {
        const index = $(this).data('index');
        deleteTask(index);
    });

    fetchTasks(); // Load from API
    render();     // First render
});
