// Define UI VARs

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Add all event listeners
loadEventListeners();


//Load all event listeners
function loadEventListeners () {
    //Add task event
    form.addEventListener('submit', addTask);
}


//Add task
function addTask(e){

    if(taskInput.value == ''){
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
};
