
function timestamp() {
    return new Date().toISOString(); 
}

function randomId() {
    return Math.floor(Math.random() * 10000); 
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


//מערך המשימות
const todos = []; 


// loading todos from localStorage
if(localStorage.getItem('todos')) {
    todos.push(...JSON.parse(localStorage.getItem('todos')));
    updateTable();
}


//הוספת משימה
document.getElementById('todoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value;

    if (todoText.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: `${timestamp()}_${randomId()}`, 
        text: todoText,
        status: "!!לך לעבוד"
    };

    todos.push(task);
    saveToLocalStorage();
    updateTable();
    todoInput.value = ''; 
});




function updateTable() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; 

    const showFullId = document.getElementById('showFullId').checked;

    todos.forEach((task) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.setAttribute('id', 'idColumn');
        
        if (showFullId) {
            idCell.textContent = task.id;  
        } else {
            idCell.textContent = task.id.slice(0, 3) + '...';  
        }

        const textCell = document.createElement('td');
        textCell.textContent = task.text;
        if (task.done) {
            textCell.style.textDecoration = 'line-through'; 
        }

        const statusCell = document.createElement('td');
        statusCell.textContent = task.status;

        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <button onclick="editTask('${task.id}')">Edit</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
            <button onclick="markAsDone('${task.id}')">Done</button>
        `;

        row.appendChild(idCell);
        row.appendChild(textCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        todoList.appendChild(row);
    });
}

document.getElementById('showFullId').addEventListener('change', updateTable);










//עריכת משימה
function editTask(id) {
    const task = todos.find(t => t.id === id);
    if (task) {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null) {
            task.text = newText;
            updateTable();
        }
    }
}


//מחיקת משימה
function deleteTask(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        saveToLocalStorage();
        updateTable();

    }
}


//סיום משימה
function markAsDone(id) {
    const task = todos.find(t => t.id === id);
    if (task) {
        task.status = 'סיימתי';
        task.done = true; 
        saveToLocalStorage(); 
        updateTable();
    }
}







