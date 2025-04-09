//practice 1
// step 1: create array to store todos
// step 2: create function to add todo to array
// step 3: get text from textbox
// step 4: add it to array
// step 5: console.log() the array
// step 6: reset the textbox value after clicking the add button every time

//practice 2
// step 7: loop through the array
// step 8: create some HTML code/element for each todo
// step 9: put the HTML on web page (using accumulator pattern)

const todoList = ["Buy groceries", "Walk the dog", "Read a book"];
// const todoList = []; // empty array

renderTodoList(); // call the function to render the list on page load

function addTodo() {
  //value property used for text box. the value is a string
  const inputElement = document.querySelector(".js-input-todo-name");
  const getTodoName = inputElement.value;
  todoList.push(getTodoName);
  console.log(todoList);

  inputElement.value = "";

  renderTodoList(); // call the function to render the list after adding a new todo
}

function renderTodoList() {
  let todoListHTML = ""; // accumulator pattern to store HTML code
  for (let i = 0; i < todoList.length; i++) {
    const todoItem = todoList[i];
    const todoItemHTML = `<p>${todoItem}</p>`;
    todoListHTML += todoItemHTML; // add the new HTML to the accumulator
  }
  console.log("🚀 ~ todoListHTML:", todoListHTML);

  const addTodoListHtml = document.querySelector(".js-add-todoList-html");
  addTodoListHtml.innerHTML = todoListHTML; // put the HTML on the web page
}
