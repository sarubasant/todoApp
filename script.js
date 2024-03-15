var tasks = []
function addTask() {
    var taskInput = document.querySelector('#todoInput')
    var taskValue = taskInput.value
    console.log(taskValue)
    if (taskValue.trim() !== "") {
        //add task
        tasks.push({
            text: taskValue,
            completed: false
        })
        taskInput.value = ""
        updateTodoList()
    }

}

function updateTodoList() {
    const todoList = document.querySelector('#todoList')
    //clear existing 
    todoList.innerHTML = ""
    tasks.forEach((task) => {
        var listItem = document.createElement('li')
        listItem.textContent = task.text;
        listItem.className = task.completed ? 'completed' : ""
        listItem.onclick = function () {
            toggleCompleted(task);
        }
        //for deleting
        listItem.addEventListener('contextmenu', function (ev) {
            ev.preventDefault(); // Prevent the default context menu
            const indexToRemove = tasks.findIndex(obj => obj.text === task.text); // Find the index of the object
            if (indexToRemove > -1) {
                tasks.splice(indexToRemove, 1); // Remove one item at the specified index
                updateTodoList();
            }
            return false;
        }, false);

        todoList.appendChild(listItem)
    })
    //function to calculate todos, completed
    updateAggregate();
}

function toggleCompleted(task) {
    task.completed = !task.completed
    updateTodoList()
}

function updateAggregate() {
    var totalTasks = document.querySelector('#totalTasksCount')
    var completedTasks = document.querySelector('#completedTasksCount')
    var total = tasks.length;
    var completed = tasks.reduce((acc, task) => {
        return task.completed ? acc + 1 : acc
    }, 0)
    totalTasks.textContent = total
    completedTasks.textContent = completed
}

function filterTasks() {
    var searchInput = document.querySelector('#searchInput')
    var searchValue = searchInput.value.toLowerCase();

    var filteredTasks = tasks.filter((task) => {
        return task.text.toLowerCase().includes(searchValue)
    })
    updateTodoListWithFilteredTasks(filteredTasks)
}

function updateTodoListWithFilteredTasks(filteredTasks) {
    var todoList = document.querySelector('#todoList')
    todoList.innerHTML = ""


    filteredTasks.forEach((task) => {
        var listItem = document.createElement('li')
        listItem.textContent = task.text
        listItem.className = task.completed ? 'completed' : ""
        listItem.onclick = function () {
            toggleCompleted(task)
        }
        todoList.appendChild(listItem)
    })
    updateAggregrate()
}



