//step 10: generate HTML code and make it interactive: delete todoItem
//step 11: create due date feature
//step 12: add css

const todoList = [
  //using object to group todoName and date together
  {
    name: "Buy groceries",
    dueDate: "2023-01-01",
  },
  {
    name: "Walk the dog",
    dueDate: "2023-01-02",
  },
  {
    name: "Read a book",
    dueDate: "2023-01-03",
  },
];
// const todoList = []; // empty array

renderTodoList(); // call the function to render the list on page load

function addTodo() {
  //value property used for text box. the value is a string
  const inputElement = document.querySelector(".js-input-todo-name");
  const getTodoName = inputElement.value;

  const dueDateInputElement = document.querySelector(".js-todo-due-date-input");
  const getTodoDueDate = dueDateInputElement.value;
  todoList.push({
    name: getTodoName,
    dueDate: getTodoDueDate,
  });
  // console.log(todoList);

  inputElement.value = "";
  dueDateInputElement.value = "";

  renderTodoList(); // call the function to render the list after adding a new todo
}

function renderTodoList() {
  let todoListHTML = ""; // accumulator pattern to store HTML code
  for (let i = 0; i < todoList.length; i++) {
    const todoItemObject = todoList[i];
    // destructuring the object to get the name and date
    const { name: todoItemName, dueDate: todoItemDueDate } = todoItemObject;

    const todoItemHTML = `
      <div>${todoItemName}</div>
      <div>${todoItemDueDate}</div>
      <button onclick="
        todoList.splice(${i}, 1); // remove the item from the array
        renderTodoList(); // call the function to render the list after deleting the todo
      " class="delete-todo-button">Delete</button>

      `;
    todoListHTML += todoItemHTML; // add the new HTML to the accumulator
  }
  // console.log("🚀 ~ todoListHTML:", todoListHTML);

  const addTodoListHtml = document.querySelector(".js-add-todoList-html");
  addTodoListHtml.innerHTML = todoListHTML; // put the HTML on the web page
}
