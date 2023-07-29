let tasks = []


const addTaskBtn = document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click", ()=>{
    addTask()
})

chrome.storage.sync.get(["tasks"],(res)=>{
    tasks = res.tasks? res.tasks : []
    renderTasks()
})

function saveTasks(){
    chrome.storage.sync.set({
        tasks,
    })
}

function renderTask(tasksNum){
    const taskRow = document.createElement("div")

    const text = document.createElement("input")
    text.type = "text"
    text.placeholder = "Enter a task ..."
    text.value = tasks[tasksNum]
    text.addEventListener("change",()=>{
        tasks[tasksNum] = text.value
        saveTasks()
    })

    const deleteBtn = document.createElement("input")
    deleteBtn.type = "button"
    deleteBtn.value = "X"
    deleteBtn.addEventListener("click",()=>{
        deleteTask(tasksNum)
    })


    taskRow.appendChild(text)
    taskRow.appendChild(deleteBtn)

    const taskContainer = document.getElementById("task-container")
    taskContainer.appendChild(taskRow)
}

function addTask() {
    const tasksNum = tasks.length
    tasks.push("")
    renderTask(tasksNum)
    saveTasks()
    
}

function deleteTask(tasksNum){
 tasks.splice(tasksNum,1)
 renderTasks()
 saveTasks()
}

function renderTasks(){
    const taskContainer = document.getElementById("task-container")
    taskContainer.textContent = " "
    tasks.forEach((taskText, tasksNum)=>{
        renderTask(tasksNum)
    })
}