const apiURL = "http://localhost:3000/task";

// Correct table body reference
const tableBody = document.getElementById("taskTable");

// ================= LOAD TASKS =================
async function loadTasks() {
  const response = await fetch(apiURL);
  const data = await response.json();

  tableBody.innerHTML = data
    .map((task) => {
      return `
        <tr>
          <td>${task.id}</td>
          <td>${task.title}</td>
          <td>${task.startDate}</td>
          <td>${task.endDate}</td>
          <td>${task.priority}</td>
          <td>${task.status}</td>
          <td>${task.displayTime || "00:00"}</td>

          <td>
            <button class="btn btn-sm btn-warning" onclick="editTask('${
              task.id
            }')">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask('${
              task.id
            }')">Delete</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

// Load tasks on page load
loadTasks();

// ================= DELETE TASK =================
async function deleteTask(id) {
  await fetch(`${apiURL}/${id}`, { method: "DELETE" });
  loadTasks();
}

// ================= EDIT TASK =================
async function editTask(id) {
  const response = await fetch(`${apiURL}/${id}`);
  const task = await response.json();

  document.getElementById("title").value = task.title;
  document.getElementById("start-date").value = task.startDate;
  document.getElementById("end-date").value = task.endDate;
  document.getElementById("priority").value = task.priority;
  document.getElementById("status").value = task.status;
  document.getElementById("display-time").value = task.displayTime || "00:00";

  window.editId = id;
}

// ================= CREATE / UPDATE =================
document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let task = {
    title: document.getElementById("title").value,
    startDate: document.getElementById("start-date").value,
    endDate: document.getElementById("end-date").value,
    priority: document.getElementById("priority").value,
    status: document.getElementById("status").value,
    displayTime: document.getElementById("display-time").value,
  };

  // UPDATE existing
  if (window.editId) {
    await fetch(`${apiURL}/${window.editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    window.editId = undefined;
  }
  // CREATE new
  else {
    await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  }

  e.target.reset();
  loadTasks();
});
