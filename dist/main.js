"use strict";
var _a;
function handleSubmit(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName")
        .value;
    const lastName = document.getElementById("lastName")
        .value;
    const address = document.getElementById("address")
        .value;
    const dob = document.getElementById("dob").value;
    const position = document.getElementById("position")
        .value;
    const jobTitle = document.getElementById("jobTitle")
        .value;
    const salary = document.getElementById("salary").value;
    const married = document.getElementById("married")
        .checked;
    const tableBody = document.querySelector("#dataTable tbody");
    const newRow = tableBody.insertRow();
    const rowIndex = tableBody.rows.length;
    newRow.innerHTML = `
          <td>${rowIndex}</td>
          <td>${firstName}</td>
          <td>${lastName}</td>
          <td>${address}</td>
          <td>${dob}</td>
          <td>${position}</td>
          <td>${jobTitle}</td>
          <td>Job Description</td>
          <td>${salary}</td>
          <td>${married ? "Yes" : "No"}</td>
          <td>
              <button class="btn btn-info btn-sm edit-btn">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn">Delete</button>
          </td>
      `;
    saveToLocalStorage();
    const modal = document.querySelector("#exampleModal");
    const addForm = document.getElementById("addForm");
    addForm.reset();
}
function saveToLocalStorage() {
    const tableBody = document.querySelector("#dataTable tbody");
    const rows = Array.from(tableBody.rows);
    const data = rows.map((row) => {
        const cells = Array.from(row.cells);
        return {
            firstName: cells[1].textContent || "",
            lastName: cells[2].textContent || "",
            address: cells[3].textContent || "",
            dob: cells[4].textContent || "",
            position: cells[5].textContent || "",
            jobTitle: cells[6].textContent || "",
            salary: cells[8].textContent || "",
            married: cells[9].textContent === "Yes",
        };
    });
    localStorage.setItem("tableData", JSON.stringify(data));
}
function loadFromLocalStorage() {
    const data = localStorage.getItem("tableData");
    if (data) {
        const parsedData = JSON.parse(data);
        const tableBody = document.querySelector("#dataTable tbody");
        parsedData.forEach((item, index) => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
              <td>${index + 1}</td>
              <td>${item.firstName}</td>
              <td>${item.lastName}</td>
              <td>${item.address}</td>
              <td>${item.dob}</td>
              <td>${item.position}</td>
              <td>${item.jobTitle}</td>
              <td>Job Description</td>
              <td>${item.salary}</td>
              <td>${item.married ? "Yes" : "No"}</td>
              <td>
                  <button  type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo">Edit</button>
                  <button class="btn btn-danger btn-sm delete-btn">Delete</button>
              </td>
          `;
        });
    }
}
function handleDelete(event) {
    const target = event.target;
    if (target.classList.contains("delete-btn")) {
        const row = target.closest("tr");
        if (row) {
            row.remove();
            saveToLocalStorage();
        }
    }
}
function handleEdit(event) {
    const target = event.target;
    if (target.classList.contains("edit-btn")) {
        const row = target.closest("tr");
        if (row) {
            const cells = row.getElementsByTagName("td");
            document.getElementById("firstName").value =
                cells[1].textContent || "";
            document.getElementById("lastName").value =
                cells[2].textContent || "";
            document.getElementById("address").value =
                cells[3].textContent || "";
            document.getElementById("dob").value =
                cells[4].textContent || "";
            document.getElementById("position").value =
                cells[5].textContent || "";
            document.getElementById("jobTitle").value =
                cells[6].textContent || "";
            document.getElementById("salary").value =
                cells[8].textContent || "";
            document.getElementById("married").checked =
                cells[9].textContent === "Yes";
            document.getElementById("submitBtn").textContent =
                "Update";
            document.getElementById("submitBtn").onclick =
                function () {
                    handleUpdate(row);
                };
        }
    }
}
function handleUpdate(row) {
    const firstName = document.getElementById("firstName")
        .value;
    const lastName = document.getElementById("lastName")
        .value;
    const address = document.getElementById("address")
        .value;
    const dob = document.getElementById("dob").value;
    const position = document.getElementById("position")
        .value;
    const jobTitle = document.getElementById("jobTitle")
        .value;
    const salary = document.getElementById("salary").value;
    const married = document.getElementById("married")
        .checked;
    row.innerHTML = `
          <td>${row.rowIndex}</td>
          <td>${firstName}</td>
          <td>${lastName}</td>
          <td>${address}</td>
          <td>${dob}</td>
          <td>${position}</td>
          <td>${jobTitle}</td>
          <td>Job Description</td>
          <td>${salary}</td>
          <td>${married ? "Yes" : "No"}</td>
          <td>
              <button class="btn btn-info btn-sm edit-btn">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn">Delete</button>
          </td>
      `;
    saveToLocalStorage();
    const addForm = document.getElementById("addForm");
    addForm.reset();
}
window.addEventListener("load", () => {
    loadFromLocalStorage();
});
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", handleSubmit);
(_a = document
    .querySelector("#dataTable")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (event) {
    if (event.target) {
        handleDelete(event);
        handleEdit(event);
    }
});
