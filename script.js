// Function to add a task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskList = document.getElementById("taskList");

    // Create new task item
    const taskItem = document.createElement("li");

    taskItem.textContent = taskText;

    // Add click event to mark task as completed
    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
    });

    // Create delete button for task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    taskInput.value = "";
}
