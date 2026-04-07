let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#list");

let allBtn = document.querySelector("#all");
let doneBtn = document.querySelector("#done");
let notDoneBtn = document.querySelector("#notDone");

let todos = JSON.parse(localStorage.getItem("myT")) || [];
let mode = "all";

addBtn.addEventListener("click", addTodo);

allBtn.addEventListener("click", () => {
    mode = "all";
    render();
}); 
    
doneBtn.addEventListener("click", () => {
    mode = "done";
    render();
});

notDoneBtn.addEventListener("click", () => {
    mode = "notDone";
    render();
});

function addTodo() {
    let text = input.value.trim();
    if (text === "") return;
    todos.push({ 
        text : text,
        done : false
    });
    input.value = "";
    render();
}

function render() {
    list.innerHTML = "";

    let filteredList = todos;
    if (mode === "done") {
        filteredList = todos.filter(todo => todo.done === true);
    } else if (mode === "notDone") {
        filteredList = todos.filter(todo => todo.done === false);
    }

    filteredList.forEach((todo) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = todo.text;
        
        let delBtn = document.createElement("button");
        delBtn.textContent = "삭제";

        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            todos = todos.filter(t => t !== todo);
            render();
        });

        li.addEventListener("click", () => {
            todo.done = !todo.done;
            render();
        });

        if (todo.done) li.classList.add("done");

        li.appendChild(delBtn);
        li.appendChild(span);
        list.appendChild(li);
    });

    allBtn.classList.remove("active");
    doneBtn.classList.remove("active");
    notDoneBtn.classList.remove("active");

    if (mode === "all") {
        allBtn.classList.add("active");
    } else if (mode === "done") {
        doneBtn.classList.add("active");
    } else if (mode === "notDone") {
        notDoneBtn.classList.add("active");
    }

    localStorage.setItem("myT", JSON.stringify(todos));
    saveT();
}

function saveT() {
    localStorage.setItem("todos", JSON.stringify(todos));
}