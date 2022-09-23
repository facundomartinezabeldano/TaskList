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
    //Add task event
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click',clearAll);
    filter.addEventListener('keyup',filterTasks);
}


//Add task
function addTask(e) {
    if (taskInput.value == '') {
        alert('Add a task')
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
    //Clear input
    taskInput.value = '';
    e.preventDefault();
}
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

//No podemos llamar a la "funcion" removeTask porque simplemente no es una funcion
function clearAll(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}