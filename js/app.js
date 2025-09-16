
import { createTaskCard } from './dom.js';
import { initDragDrop } from './dragdrop.js';
import { loadTasks, saveTasks } from './storage.js';

let tasks = loadTasks();

// selectors
const form = document.getElementById('taskForm');
const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDescription');
const columns = {
  todo: document.getElementById('todoColumn'),
  progress: document.getElementById('progressColumn'),
  done: document.getElementById('doneColumn')
};
const counts = {
  todo: document.getElementById('todoCount'),
  progress: document.getElementById('progressCount'),
  done: document.getElementById('doneCount')
};
const statsText = document.getElementById('statsText');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');

// render tasks
function render() {
  Object.values(columns).forEach(col => (col.innerHTML = ''));

  tasks.forEach(task => {
    const card = createTaskCard(task);
    columns[task.status].appendChild(card);
  });

  updateCounts();
  initDragDrop(tasks, render);
}

// update counts + footer stats
function updateCounts() {
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const progressCount = tasks.filter(t => t.status === 'progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;

  counts.todo.textContent = todoCount;
  counts.progress.textContent = progressCount;
  counts.done.textContent = doneCount;

  statsText.textContent = `Total tasks: ${tasks.length} | Completed: ${doneCount} | In progress: ${progressCount} | Pending: ${todoCount}`;
}

// toast show
function showToast(title, message) {
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

// add new task
form.addEventListener('submit', e => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  if (!title) return;

  const task = {
    id: Date.now().toString(),
    title,
    description,
    status: 'todo'
  };

  tasks.push(task);
  saveTasks(tasks);
  render();
  showToast('Task Added', `"${title}" has been added to To Do`);

  form.reset();
});

// initial render
render();
