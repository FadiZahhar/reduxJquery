## 🧱 Modular Structure Suggestion

Split `app.js` into clear responsibilities:

```
scripts/
├── store.js         // Redux: state, reducer, store
├── actions.js       // Redux: action creators
├── api.js           // External API logic
├── dom.js           // DOM rendering & events
├── main.js          // App entry point
```

---

## 📄 `store.js` – Redux Store & Reducer

```js
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
```

---

## 📄 `actions.js` – Action Creators

```js
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
```

---

## 📄 `api.js` – Data Fetching

```js
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
```

---

## 📄 `dom.js` – UI Rendering & Event Handling

```js
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
```

---

## 📄 `main.js` – Entry Point

```js
$(function () {
  setupUI();
  fetchTasks();
  renderTasks(); // initial render
});
```

---

## ✅ Benefits of This Modular Setup

| Concern       | Location     | Why it's good                          |
| ------------- | ------------ | -------------------------------------- |
| Redux State   | `store.js`   | All state logic in one file            |
| Actions       | `actions.js` | Easy to update logic or types          |
| API Logic     | `api.js`     | Can be mocked or reused easily         |
| DOM Control   | `dom.js`     | UI code isolated from logic            |
| App Bootstrap | `main.js`    | Keeps startup logic clean and readable |

---

## 🧩 Combine With a Build Tool (Optional)

If your project grows, use a bundler like **Vite**, **Parcel**, or **Webpack** to combine and load modules cleanly.

For now, you can simply include the scripts in this order in `index.html`:

```html
<script src="scripts/store.js"></script>
<script src="scripts/actions.js"></script>
<script src="scripts/api.js"></script>
<script src="scripts/dom.js"></script>
<script src="scripts/main.js"></script>
```