// UI Selectors
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('todo-btn') // CTA Call to action
const todoContainer = document.getElementById('todo-container')

// this will be an array of objects
const todoList = []; 

let currentTodo;

// this will listen for changes on the field.
todoInput.addEventListener('change', (event)=>{
    currentTodo  = event.target.value
})

// this will tell us if we are focused on the element or not. (i.e click or moved away. )
todoInput.addEventListener('blur', (event)=>{
    event.target.value = ''
})

// this is the action btn that will trigger the render. 
addBtn.addEventListener('click', (event)=>{
    todoList.push({isComplete: false, message: currentTodo})
    console.log(todoList)
    renderTodos()

    // we need to remove the value here after we render our list
    currentTodo = ''
})


// complete todo handler
const completeTodo =  (position) => {
    todoList[position].isComplete = !todoList[position].isComplete // bang operator => !
    renderTodos()
}

// delete todo handler
const deleteTodo = (position) => {
    todoList.splice(position, 1)
    renderTodos()
}

// render done btn
const renderDoneBtn = (position)=>{
    return(`
        <button class="mdc-fab mdc-fab--mini mdc-fab--touch complete-btn ${!todoList[position].isComplete ? '': 'recycling'}" onclick={completeTodo(${position})}>
            <div class="mdc-fab__ripple"></div>
            <span class="material-icons mdc-fab__icon">
                <span class="material-icons">
                    ${!todoList[position].isComplete ? 'done': 'recycling'}
                </span>
            </span>
            <div class="mdc-fab__touch"></div>
        </button>
    `)
}

// render remove btn
const renderRemoveBtn = (position)=>{
    return(`
        <button class="mdc-fab mdc-fab--mini mdc-fab--touch remove-btn" onclick={deleteTodo(${position})}>
            <div class="mdc-fab__ripple"></div>
            <span class="material-icons mdc-fab__icon">
                <span class="material-icons">
                    remove_circle
                </span>
            </span>
            <div class="mdc-fab__touch"></div>
        </button>
    `)
}


// card that will be represented on the UI 
const card = (todo, index)=>{
    return (
        `
        <div id="todo-card-${index}" class= "mdc-card mdc-card--outlined todo-card ${todo.isComplete ? "complete" : ""}">
            <div class="list-item">
                ${todo.message}
            </div>
            <div class="action-items">
                ${renderDoneBtn(index)}
                ${renderRemoveBtn(index)}
            </div>
        </div>
        `
    )
}

// function to render the todo list. 
const renderTodos = () => {
    todoContainer.innerHTML = todoList.map(card).join('')
}
