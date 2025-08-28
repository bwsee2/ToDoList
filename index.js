document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addTask");
    const input = document.getElementById("task");
    const list = document.getElementById("taskList")

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if(!text) return;
        
        const li = document.createElement("li");
        li.draggable = true;

        let dragging = null;

        list.addEventListener("dragstart", (e) => {
            const li = e.target.closest("li");
            if (!li) return;
            dragging = li;
            li.classList.add(dragging);
            e.dataTransfer.effectAllowed = "move";
        });

        list.addEventListener("dragover", (e) => {
            e.preventDefault();
            const over = e.target.closest("li");
            if (!over || over === dragging) return;

            const rect = over.getBoundingClientRect();
            const after = (e.clientY - rect.top) > rect.height / 2;

            over.parentNode.insertBefore(dragging, after ? over.nextSibling:over);
        });

        const handle = document.createElement("span");
        handle.className = "drag-handle";
        handle.textContent = "⋮";
        

        const span = document.createElement("span");
        span.textContent = text;
        span.className = "task-text";


        const delBtn = document.createElement("button");
        delBtn.textContent = "x";
        delBtn.className = "delete";

        li.appendChild(handle);
        li.appendChild(span);
        li.appendChild(delBtn);

        list.appendChild(li);
        form.reset();
        input.focus();
    });

    list.addEventListener("click", (e) => {
        console.log("clicked:", e.target.className);
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains("task-text")){
            const li = e.target.parentElement
            e.target.classList.toggle("completed");
            if (e.target.classList.contains("completed")) {
                list.appendChild(li);
            } else {
                list.prepent(li);
            }
        }

        
    });
});