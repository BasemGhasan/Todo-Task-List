const taskInput = document.getElementById("task-input");
const tasksList = document.getElementById("todo-list");
const alertMessage = document.getElementById("msg");

const addTask = () => {
    if (taskInput.value.trim() === ""){
        alertMessage.classList.add("error");
        alertMessage.innerHTML = "Please enter a task !";

        //resets the div value & style after 3s
        setTimeout(() => {
            alertMessage.innerHTML = "";
            alertMessage.classList.remove("error");
        }, 3000);
    } else{
        let li = document.createElement("li");
        let p = document.createElement("p")
        p.innerHTML = taskInput.value;
        li.appendChild(p);
        tasksList.appendChild(li);

        //creates the x sign & adds it to the right of the task
        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        reorderTasks();
        saveData();
    }
    taskInput.value = "";
}

const checkTask = () => {

}

//calls the addTask function whenever the add button is pressed
document.getElementById("add-btn").addEventListener("click", addTask); 
//calls the addTask function if "Enter" was pressed while the focus is on the input feild
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        addTask();
    }
})

//checks/unchecks any pressed task
tasksList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("taskChecked");
        reorderTasks();
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
})

//reorder the tasks to move checked ones to the bottom
const reorderTasks = () => {
    const task = Array.from(tasksList.children)
    const checkedTasks = task.filter(task => task.classList.contains("taskChecked"));
    const uncheckedTasks = task.filter(task => !task.classList.contains("taskChecked"));

    tasksList.innerHTML = ""; //clear the current taskList to append them in order
    uncheckedTasks.forEach(task => tasksList.appendChild(task));
    checkedTasks.forEach(task => tasksList.appendChild(task));
}


const saveData = () => {
    localStorage.setItem("data", tasksList.innerHTML)
}

const loadData = () => {
    tasksList.innerHTML = localStorage.getItem("data");
}
loadData();
