let todolist = document.getElementById("todolist");
let enteredText = document.getElementById("inputTodo");

function save() {
  localStorage.setItem("TodosList", JSON.stringify(todosList));
}

let todosList = getTodosFromLocalStorage();

function getTodosFromLocalStorage() {
  let stringifiedTodos = localStorage.getItem("TodosList");
  let parsedTodos = JSON.parse(stringifiedTodos);

  if (parsedTodos === null) {
    return [];
  } else {
    return parsedTodos;
  }
}

let todosCount = todosList.length;

function addList() {
  let inputValue = enteredText.value;
  todosCount += 1;
  if (inputValue.trim() === "") {
    alert("Enter the Task First");
    return;
  }
  let newTodo = {
    text: inputValue,
    id: todosCount,
    isChecked: false,
  };
  todosList.push(newTodo);
  listCreation(newTodo);
  enteredText.value = "";
}

function ifChecked(checkboxId, labelId, id) {
  let ifcheckbox = document.getElementById(checkboxId);
  let ifLabel = document.getElementById(labelId);

  if (ifcheckbox.checked === true) {
    ifLabel.style.textDecoration = "line-through";
  } else {
    ifLabel.style.textDecoration = "none";
  }

  let todoIndex = todosList.findIndex((eachTodo) => {
    let todoId = eachTodo.id;

    if (todoId === id) {
      return true;
    } else {
      return false;
    }
  });
  //what does todoIndex print?

  let todoObject = todosList[todoIndex];

  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}

function deleteList(id) {
  let listItem = document.getElementById(id);
  todolist.removeChild(listItem);

  let deleteItemIndex = todosList.findIndex((eachtodo) => {
    let todoId = eachtodo.id;
    if (todoId === id) {
      return true;
    } else {
      return false;
    }
  });

  todosList.splice(deleteItemIndex, 1);
}

function listCreation(todo) {
  let checkboxId = "checkbox" + todo.id;
  let labelId = "label" + todo.id;

  let listItem = document.createElement("li");
  listItem.id = todo.id;
  todolist.appendChild(listItem);

  let divList = document.createElement("div");
  divList.classList = "listContainer";
  listItem.appendChild(divList);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxId;
  checkbox.classList = "checkboxInput";

  checkbox.onclick = function () {
    ifChecked(checkboxId, labelId, todo.id);
  };

  divList.appendChild(checkbox);

  let spanList = document.createElement("span");
  spanList.classList = "list";
  divList.appendChild(spanList);

  let label = document.createElement("label");
  label.textContent = todo.text;
  label.htmlFor = checkboxId;
  label.id = labelId;
  spanList.appendChild(label);

  if (todo.isChecked) {
    label.style.textDecoration = "line-through";
    checkbox.checked = true;
  }

  let icon = document.createElement("i");
  icon.classList = "bi bi-trash";
  icon.onclick = function () {
    deleteList(todo.id);
  };
  spanList.appendChild(icon);
}

for (let todo of todosList) {
  listCreation(todo);
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    addList();
  }
}
inputTodo.addEventListener("keydown", handleEnterKey);
