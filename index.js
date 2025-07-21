const input = document.getElementById("input");
const todo = document.getElementById("todo");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    // create li
    let li = document.createElement("li");
    let p = document.createElement("p");
    let div = document.createElement("div");
    let checkbox = document.createElement("input");
    let span = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    span.className = "remove";
    span.innerText = "X";
    p.innerText = input.value;
    input.value = "";

    div.appendChild(checkbox);
    div.appendChild(span);
    li.appendChild(p);
    li.appendChild(div);

    // add li
    todo.appendChild(li);

    // update localStorage
    updateLocalStorage();
});

document.getElementById("all").addEventListener("click", () => {
    todo.querySelectorAll("li").forEach(li => li.style.display = "flex");
});

document.getElementById("completed").addEventListener("click", () => {
    todo.querySelectorAll("li").forEach(li => li.style.display = "flex");
    todo.querySelectorAll("li:not(.checked)").forEach(li => li.style.display = "none");
});

document.getElementById("pending").addEventListener("click", () => {
    todo.querySelectorAll("li").forEach(li => li.style.display = "flex");
    todo.querySelectorAll("li.checked").forEach(li => li.style.display = "none");
});

todo.addEventListener("click", (event) => {
    let li = event.target.closest("li");
    if (event.target.classList.contains("checkbox")) {
        if (li.classList.contains("checked")) {
            li.classList.remove("checked");
        }
        else {
            li.classList.add("checked");
        }
        updateLocalStorage();
    }
});

todo.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
        event.target.closest("li").remove();
        updateLocalStorage();
    }
});

function updateLocalStorage() {
    const list = Array.from(todo.querySelectorAll("li")).map((li) => {
        let p = li.querySelector("p").innerText || "";
        let check = li.classList.contains("checked");
        return {
            p: p,
            check: check
        };
    });

    localStorage.setItem("todoList", JSON.stringify(list));
}

window.onload = () => {
    const data = localStorage.getItem("todoList");

    if (!data) return;

    const list = JSON.parse(data);

    list.forEach((item) => {
        const li = document.createElement("li");

        const p = document.createElement("p");
        p.innerText = item.p;

        const div = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.check;

        const span = document.createElement("span");
        span.innerText = "X";
        span.className = "remove";

        if (item.check) {
            li.classList.add("checked");
        }

        div.appendChild(checkbox);
        div.appendChild(span);

        li.appendChild(p);
        li.appendChild(div);

        todo.appendChild(li);
    });
};