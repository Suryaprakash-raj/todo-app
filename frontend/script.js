const API_URL = 'http://localhost:3000/tasks';


const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const taskList = document.getElementById('taskList');

function loadTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      taskList.innerHTML = '';
      data.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><input value="${task.title}" onchange="updateTask(${task.id}, this.value, '${task.description}')" /></td>
          <td><input value="${task.description}" onchange="updateTask(${task.id}, '${task.title}', this.value)" /></td>
          <td><button onclick="deleteTask(${task.id})">Delete</button></td>
        `;
        taskList.appendChild(row);
      });
    });
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  if (!title) return alert('Title is required');

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  }).then(() => {
    titleInput.value = '';
    descInput.value = '';
    loadTasks();
  });
};

function updateTask(id, title, description) {
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  }).then(loadTasks);
}

function deleteTask(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(loadTasks);
}

loadTasks();
