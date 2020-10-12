const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const inputText = document.getElementById('todo-text')

// method to add a todo item
function newTodo() {
  if(isInputValid(inputText.value)) {
    createToDo()
    incrementTodoCount()
  }
}

// method to check if input is valid
function isInputValid(input) {
  //console.log(`Input Text: ${input}`)
  console.log(`Valid Input: ${input !== null && input !== undefined && input !== ""}`)
  return(input !== null && input !== undefined && input !== "")
}

// method to create the todo element
function createToDo() {
  // Create the list item for inputText
  const toDo = document.createElement('li')
  toDo.setAttribute('class', classNames.TODO_ITEM)
  toDo.textContent = inputText.value
  inputText.value = null

  // checkbox creation
  const cbox = document.createElement('input')
  cbox.setAttribute('type', 'checkbox')
  cbox.setAttribute('class', classNames.TODO_CHECKBOX)
  cbox.addEventListener('click', function() {
    toggleUncheckedCount(cbox.checked)
  })

  // Add the delete button
  const delButton = document.createElement('input')
  delButton.setAttribute('type', 'image')
  delButton.setAttribute('src', './trash.png')
  delButton.setAttribute('class', classNames.TODO_DELETE)
  delButton.addEventListener('click', function() {
    decrementTodoCount()
    if(cbox.checked) { // if checked, decrement checked count
      decrementUncheckedCount()
    }
    removeToDo(toDo)
  })

  toDo.appendChild(delButton)
  // Add the checkbox
  toDo.appendChild(cbox)
  // Add the todo item to the list
  list.appendChild(toDo)
}

// method to remove the todo item from the list
function removeToDo(li) {
  list.removeChild(li)
}

// method to increment the todo count
function incrementTodoCount() {
  itemCountSpan.textContent = parseInt(itemCountSpan.textContent) + 1
}

// method to decrement the todo count
function decrementTodoCount() {
  itemCountSpan.textContent = parseInt(itemCountSpan.textContent) - 1
}

// method to increment the unchecked count
function incrementUncheckedCount() {
  uncheckedCountSpan.textContent = parseInt(uncheckedCountSpan.textContent) + 1
}

// method to decrement the unchecked count
function decrementUncheckedCount() {
  uncheckedCountSpan.textContent = parseInt(uncheckedCountSpan.textContent) - 1
}

// method to determine inc or dec unchecked count
function toggleUncheckedCount(checked) {
  if(!checked) {
    decrementUncheckedCount()
  } else {
    incrementUncheckedCount()
  }
}