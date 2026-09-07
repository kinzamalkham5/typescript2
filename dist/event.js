"use strict";
let todos = [];
const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const bubbleBox = document.querySelector("#bubbleBox");
const bubbleButton = document.querySelector("#bubbleButton");
const captureBox = document.querySelector("#captureBox");
const captureButton = document.querySelector("#captureButton");
const storageOutput = document.querySelector("#storageOutput");
const apiStatus = document.querySelector("#apiStatus");
const fetchButton = document.querySelector("#fetchTodos");
const saveLocal = document.querySelector("#saveLocal");
const readLocal = document.querySelector("#readLocal");
const saveSession = document.querySelector("#saveSession");
const readSession = document.querySelector("#readSession");
const saveCookie = document.querySelector("#saveCookie");
const readCookie = document.querySelector("#readCookie");
function showTodos() {
    list.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = String(todo.id);
        if (todo.completed) {
            li.classList.add("completed");
        }
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.className = "complete-btn";
        completeButton.textContent = todo.completed ? "Undo" : "Complete";
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") {
        return;
    }
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodos();
    input.value = "";
});
list.addEventListener("click", (event) => {
    const target = event.target;
    const item = target.closest(".todo-item");
    if (!item) {
        return;
    }
    const id = Number(item.dataset.id);
    if (target.classList.contains("complete-btn")) {
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            localStorage.setItem("todos", JSON.stringify(todos));
            showTodos();
        }
    }
    if (target.classList.contains("delete-btn")) {
        todos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(todos));
        showTodos();
    }
});
bubbleButton.addEventListener("click", () => {
    console.log("Button clicked");
});
bubbleBox.addEventListener("click", () => {
    console.log("Parent clicked");
});
bubbleButton.addEventListener("dblclick", (event) => {
    event.stopPropagation();
    console.log("Propagation stopped");
});
captureBox.addEventListener("click", () => {
    console.log("Parent capturing");
}, true);
captureButton.addEventListener("click", () => {
    console.log("Button clicked");
});
saveLocal.addEventListener("click", () => {
    localStorage.setItem("name", "Ali");
    storageOutput.textContent = "Saved in localStorage";
});
readLocal.addEventListener("click", () => {
    const name = localStorage.getItem("name");
    storageOutput.textContent = name || "Nothing found";
});
saveSession.addEventListener("click", () => {
    sessionStorage.setItem("username", "Ali");
    storageOutput.textContent = "Saved in sessionStorage";
});
readSession.addEventListener("click", () => {
    const username = sessionStorage.getItem("username");
    storageOutput.textContent = username || "Nothing found";
});
saveCookie.addEventListener("click", () => {
    document.cookie = "username=Ali; max-age=86400; path=/";
    storageOutput.textContent = "Cookie saved";
});
readCookie.addEventListener("click", () => {
    storageOutput.textContent = document.cookie || "No cookie found";
});
fetchButton.addEventListener("click", async () => {
    apiStatus.textContent = "Loading...";
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5", {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("API request failed");
        }
        const data = await response.json();
        apiStatus.innerHTML = "";
        data.forEach((todo) => {
            const p = document.createElement("p");
            p.textContent = `#${todo.id} - ${todo.title}`;
            apiStatus.appendChild(p);
        });
    }
    catch (error) {
        console.error(error);
        apiStatus.textContent = "API error";
    }
});
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
    try {
        todos = JSON.parse(savedTodos);
        showTodos();
    }
    catch {
        todos = [];
    }
}
