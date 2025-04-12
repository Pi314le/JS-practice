// Optimizing code
// 1. switch to .forEach() to loop through todoList array (这个数组名记不到了)
// 2. use arrow function
// 3. switch eventlistener attribute to addEventListener() method

const todoList = [
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
// const todoList = [];

renderTodoList();

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector(".js-input-todo-name");
  const getTodoName = inputElement.value;

  const dueDateInputElement = document.querySelector(".js-todo-due-date-input");
  const getTodoDueDate = dueDateInputElement.value;
  todoList.push({
    name: getTodoName,
    dueDate: getTodoDueDate,
  });

  inputElement.value = "";
  dueDateInputElement.value = "";

  renderTodoList();
}

function renderTodoList() {
  let todoListHTML = "";
  todoList.forEach((todoItemObject, index) => {
    const { name: todoItemName, dueDate: todoItemDueDate } = todoItemObject;

    const todoItemHTML = `
    <div>${todoItemName}</div>
      <div>${todoItemDueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
      `;
    todoListHTML += todoItemHTML;
  });

  const addTodoListHtml = document.querySelector(".js-add-todoList-html");
  addTodoListHtml.innerHTML = todoListHTML;
  // can't put this delete button eventlistener outside renderTodoList().
  // because this function will be called again and again: click delete->render click add->render
  // once you click anyone of them, renderTodoList() will be called again, but addeventlistener() is not in it -> that is addEventlistener() in every button will be removed

  // querySelectorAll() returns a list of all elements
  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}
