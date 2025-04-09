// step 1: create array to store todos
// step 2: create function to add todo to array
// step 3: get text from textbox
// step 4: add it to array
// step 5: console.log() the array
// step 6: reset the textbox value after clicking the add button

const todoList = [];

function addTodo() {
  //value property used for text box. the value is a string
  const inputElement = document.querySelector(".js-input-todo-name");
  const getTodoName = inputElement.value;
  todoList.push(getTodoName);
  console.log(todoList);

  inputElement.value = "";
}
