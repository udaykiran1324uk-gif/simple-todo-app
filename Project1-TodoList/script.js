document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const taskSearch = document.getElementById('taskSearch');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const editForm = document.getElementById('editForm');

    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display the username (or email if username wasn't set)
    usernameDisplay.textContent = currentUser;

    // Load tasks from LocalStorage
    function getTasks() {
        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        return allTasks.filter(t => t.username === currentUser);
    }

    function saveTask(task) {
        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (task.id) {
            const index = allTasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                // Preserve original creation date if it exists
                const originalTask = allTasks[index];
                task.createdAt = task.createdAt || originalTask.createdAt;
                allTasks[index] = task;
            }
        } else {
            task.id = Date.now();
            task.username = currentUser;
            task.createdAt = new Date().toISOString();
            allTasks.push(task);
        }
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        renderTasks(taskSearch.value);
    }

    function deleteTaskFromStorage(id) {
        let allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        allTasks = allTasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        renderTasks(taskSearch.value);
    }

    // Render tasks to the UI with optional search filter
    function renderTasks(searchTerm = '') {
        const tasks = getTasks();
        const filteredTasks = tasks.filter(task => {
            const term = searchTerm.toLowerCase();
            return task.title.toLowerCase().includes(term) || 
                   (task.description && task.description.toLowerCase().includes(term));
        });

        pendingTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        if (filteredTasks.length === 0 && searchTerm) {
            const noResults = `<div class="text-center p-5 text-muted">
                <i class="bi bi-search fs-1 d-block mb-3"></i>
                No missions found matching "${searchTerm}"
            </div>`;
            pendingTasksList.innerHTML = noResults;
            return;
        }

        filteredTasks.forEach(task => {
            const item = document.createElement('div');
            item.className = 'list-group-item d-flex justify-content-between align-items-center shadow-sm';
            
            const dateObj = task.createdAt ? new Date(task.createdAt) : null;
            const formattedDate = dateObj 
                ? `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                : 'No timestamp';

            const content = `
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                        <h6 class="${task.completed ? 'completed-task' : ''} mb-0 fw-bold text-primary">${task.title}</h6>
                        <span class="badge bg-light text-muted border small" style="font-size: 0.7rem;">
                            <i class="bi bi-calendar3 me-1"></i>${formattedDate}
                        </span>
                    </div>
                    <p class="text-muted small mb-0">${task.description || 'No intel provided'}</p>
                </div>
                <div class="task-actions d-flex gap-2 ms-3">
                    <button class="btn btn-sm btn-outline-success border-0" onclick="toggleTask(${task.id})" title="Toggle Status">
                        <i class="bi bi-${task.completed ? 'arrow-counterclockwise' : 'check-lg'}"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary border-0" onclick="openEditModal(${task.id})" title="Edit Mission">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger border-0" onclick="deleteTask(${task.id})" title="Abort Mission">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            item.innerHTML = content;

            if (task.completed) {
                completedTasksList.appendChild(item);
            } else {
                pendingTasksList.appendChild(item);
            }
        });
    }

    // Search event listener
    taskSearch.addEventListener('input', (e) => {
        renderTasks(e.target.value);
    });

    // Add new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDesc').value;
        saveTask({ title, description, completed: 0 });
        taskForm.reset();
    });

    // Toggle task completion
    window.toggleTask = (id) => {
        const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const task = allTasks.find(t => t.id === id);
        if (task) {
            task.completed = task.completed ? 0 : 1;
            saveTask(task);
        }
    };

    // Delete task
    window.deleteTask = (id) => {
        if (confirm('Are you sure you want to abort this mission?')) {
            deleteTaskFromStorage(id);
        }
    };

    // Edit Modal handling
    window.openEditModal = (id) => {
        const tasks = getTasks();
        const task = tasks.find(t => t.id === id);
        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTitle').value = task.title;
        document.getElementById('editDesc').value = task.description;
        document.getElementById('editCompleted').checked = !!task.completed;
        editModal.show();
    };

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('editTaskId').value);
        const title = document.getElementById('editTitle').value;
        const description = document.getElementById('editDesc').value;
        const completed = document.getElementById('editCompleted').checked ? 1 : 0;

        saveTask({ id, title, description, completed, username: currentUser });
        editModal.hide();
    });

    renderTasks();
});
