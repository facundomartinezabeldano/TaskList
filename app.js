// Define UI VARs

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Add all event listeners
loadEventListeners();


//Load all event listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) { //si no tenemos tasks guardadas
        tasks = []; //declaramos el array de tasks vacio
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')) //sino convertimos tasks en un json
    }
    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

//Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    // Create li element
    const li = document.createElement('li');
    //Add a class
    li.className = 'collection-item';
    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add a class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);
    //Append the li to the ul
    taskList.appendChild(li);
    //Add to local storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
    taskInput.value = '';
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) { //si no tenemos tasks guardadas
        tasks = []; //declaramos el array de tasks vacio
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')) //sino convertimos tasks en un json
    }

    tasks.push(task); //pusheamos el elemento
    localStorage.setItem('tasks', JSON.stringify(tasks))  //lo guardamos como string y lo guardamos
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            //And remove the task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//No podemos llamar a la "funcion" removeTask porque simplemente no es una funcion
function clearTasks(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}