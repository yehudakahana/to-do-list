function timestamp() {
    return new Date().toISOString(); 
}

function randomId() {
    return Math.floor(Math.random() * 10000); 
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


let ascending = true;

    // פונקציית מיון
    document.getElementById('sortButton').addEventListener('click', function() {
        todos.sort(function(a, b) {
            if (ascending) {
                return a.text.localeCompare(b.text); 
            } else {
                return b.text.localeCompare(a.text); 
            }
        });

        ascending = !ascending; 
        document.getElementById('sortButton').textContent = ascending ? '↓' : '↑'; 
        saveToLocalStorage();
        updateTable();
    });






const todos = []; 



// טעינת המשימות מה-LocalStorage אם קיימות
if(localStorage.getItem('todos')) {
    todos.push(...JSON.parse(localStorage.getItem('todos')));
    updateTable();
}

// מאזין לאירוע שליחת הטופס להוספת משימה
document.getElementById('todoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }

    // יצירת אובייקט משימה חדש
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


// פונקציה לעדכון הטבלה עם המשימות
function updateTable() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    const showFullId = document.getElementById('showFullId').checked; 

    // יצירת שורה עבור כל משימה
    todos.forEach((task) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.setAttribute('id', 'idColumn');
        
        // הצגת ה-ID המלא או חלקי לפי בחירת המשתמש
        idCell.textContent = showFullId ? task.id : task.id.slice(0, 3) + '...';  

        const textCell = document.createElement('td');
        textCell.textContent = task.text;

        // אם המשימה הושלמה, להוסיף קו חוצה על הטקסט
        if (task.done) {
            textCell.style.textDecoration = 'line-through'; 
        }

        const statusCell = document.createElement('td');
        statusCell.textContent = task.status;

        // יצירת כפתורי עריכה ומחיקה עבור כל משימה
        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <button onclick="editTask('${task.id}')">Edit</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
            <button onclick="markAsDone('${task.id}')">Done</button>
        `;

        // הוספת התאים לשורה והוספת השורה לטבלה
        row.appendChild(idCell);
        row.appendChild(textCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        todoList.appendChild(row);
    });
}

// מאזין לשינוי בתיבת הסימון להצגת ID מלא
document.getElementById('showFullId').addEventListener('change', updateTable);

// פונקציה לעריכת משימה
function editTask(id) {
    const task = todos.find(t => t.id === id);
    if (task) {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null) {
            task.text = newText;
            saveToLocalStorage(); 
            updateTable();
        }
    }
}

// פונקציה למחיקת משימה
function deleteTask(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        saveToLocalStorage(); 
        updateTable();
    }
}

// פונקציה לסיום משימה
function markAsDone(id) {
    const task = todos.find(t => t.id === id);
    if (task) {
        task.status = 'סיימתי'; 
        task.done = true; 
        saveToLocalStorage(); 
        updateTable();
    }
}


































// function timestamp() {
//     return new Date().toISOString(); 
// }

// function randomId() {
//     return Math.floor(Math.random() * 10000); 
// }

// function saveToLocalStorage() {
//     localStorage.setItem('todos', JSON.stringify(todos));
// }


// //מערך המשימות
// const todos = []; 


// // loading todos from localStorage
// if(localStorage.getItem('todos')) {
//     todos.push(...JSON.parse(localStorage.getItem('todos')));
//     updateTable();
// }


// //הוספת משימה
// document.getElementById('todoForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const todoInput = document.getElementById('todoInput');
//     const todoText = todoInput.value;

//     if (todoText.trim() === '') {
//         alert('Please enter a task!');
//         return;
//     }

//     const task = {
//         id: `${timestamp()}_${randomId()}`, 
//         text: todoText,
//         status: "!!לך לעבוד"
//     };

//     todos.push(task);
//     saveToLocalStorage();
//     updateTable();
//     todoInput.value = ''; 
// });




// function updateTable() {
//     const todoList = document.getElementById('todoList');
//     todoList.innerHTML = ''; 

//     const showFullId = document.getElementById('showFullId').checked;

//     todos.forEach((task) => {
//         const row = document.createElement('tr');

//         const idCell = document.createElement('td');
//         idCell.setAttribute('id', 'idColumn');
        
//         if (showFullId) {
//             idCell.textContent = task.id;  
//         } else {
//             idCell.textContent = task.id.slice(0, 3) + '...';  
//         }

//         const textCell = document.createElement('td');
//         textCell.textContent = task.text;
//         if (task.done) {
//             textCell.style.textDecoration = 'line-through'; 
//         }

//         const statusCell = document.createElement('td');
//         statusCell.textContent = task.status;

//         const actionsCell = document.createElement('td');
//         actionsCell.innerHTML = `
//             <button onclick="editTask('${task.id}')">Edit</button>
//             <button onclick="deleteTask('${task.id}')">Delete</button>
//             <button onclick="markAsDone('${task.id}')">Done</button>
//         `;

//         row.appendChild(idCell);
//         row.appendChild(textCell);
//         row.appendChild(statusCell);
//         row.appendChild(actionsCell);

//         todoList.appendChild(row);
//     });
// }

// document.getElementById('showFullId').addEventListener('change', updateTable);










// //עריכת משימה
// function editTask(id) {
//     const task = todos.find(t => t.id === id);
//     if (task) {
//         const newText = prompt('Edit task:', task.text);
//         if (newText !== null) {
//             task.text = newText;
//             updateTable();
//         }
//     }
// }


// //מחיקת משימה
// function deleteTask(id) {
//     const index = todos.findIndex(t => t.id === id);
//     if (index !== -1) {
//         todos.splice(index, 1);
//         saveToLocalStorage();
//         updateTable();

//     }
// }


// //סיום משימה
// function markAsDone(id) {
//     const task = todos.find(t => t.id === id);
//     if (task) {
//         task.status = 'סיימתי';
//         task.done = true; 
//         saveToLocalStorage(); 
//         updateTable();
//     }
// }







