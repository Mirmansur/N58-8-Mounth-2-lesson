function handleSubmit(event: Event) {
  event.preventDefault();

  const firstName = (document.getElementById("firstName") as HTMLInputElement)
    .value;
  const lastName = (document.getElementById("lastName") as HTMLInputElement)
    .value;
  const address = (document.getElementById("address") as HTMLSelectElement)
    .value;
  const dob = (document.getElementById("dob") as HTMLInputElement).value;
  const position = (document.getElementById("position") as HTMLSelectElement)
    .value;
  const jobTitle = (document.getElementById("jobTitle") as HTMLSelectElement)
    .value;
  const salary = (document.getElementById("salary") as HTMLInputElement).value;
  const married = (document.getElementById("married") as HTMLInputElement)
    .checked;

  const tableBody = document.querySelector(
    "#dataTable tbody"
  ) as HTMLTableSectionElement;
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

  const modal = document.querySelector("#exampleModal") as HTMLElement;
  const addForm = document.getElementById("addForm") as HTMLFormElement;
  addForm.reset();
}

function saveToLocalStorage() {
  const tableBody = document.querySelector(
    "#dataTable tbody"
  ) as HTMLTableSectionElement;
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
    const tableBody = document.querySelector(
      "#dataTable tbody"
    ) as HTMLTableSectionElement;
    parsedData.forEach((item: any, index: number) => {
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

function handleDelete(event: Event) {
  const target = event.target as HTMLButtonElement;
  if (target.classList.contains("delete-btn")) {
    const row = target.closest("tr");
    if (row) {
      row.remove();
      saveToLocalStorage();
    }
  }
}

function handleEdit(event: Event) {
  const target = event.target as HTMLButtonElement;
  if (target.classList.contains("edit-btn")) {
    const row = target.closest("tr");
    if (row) {
      const cells = row.getElementsByTagName("td");
      (document.getElementById("firstName") as HTMLInputElement).value =
        cells[1].textContent || "";
      (document.getElementById("lastName") as HTMLInputElement).value =
        cells[2].textContent || "";
      (document.getElementById("address") as HTMLSelectElement).value =
        cells[3].textContent || "";
      (document.getElementById("dob") as HTMLInputElement).value =
        cells[4].textContent || "";
      (document.getElementById("position") as HTMLSelectElement).value =
        cells[5].textContent || "";
      (document.getElementById("jobTitle") as HTMLSelectElement).value =
        cells[6].textContent || "";
      (document.getElementById("salary") as HTMLInputElement).value =
        cells[8].textContent || "";
      (document.getElementById("married") as HTMLInputElement).checked =
        cells[9].textContent === "Yes";
      (document.getElementById("submitBtn") as HTMLButtonElement).textContent =
        "Update";
      (document.getElementById("submitBtn") as HTMLButtonElement).onclick =
        function () {
          handleUpdate(row);
        };
    }
  }
}

function handleUpdate(row: HTMLTableRowElement) {
  const firstName = (document.getElementById("firstName") as HTMLInputElement)
    .value;
  const lastName = (document.getElementById("lastName") as HTMLInputElement)
    .value;
  const address = (document.getElementById("address") as HTMLSelectElement)
    .value;
  const dob = (document.getElementById("dob") as HTMLInputElement).value;
  const position = (document.getElementById("position") as HTMLSelectElement)
    .value;
  const jobTitle = (document.getElementById("jobTitle") as HTMLSelectElement)
    .value;
  const salary = (document.getElementById("salary") as HTMLInputElement).value;
  const married = (document.getElementById("married") as HTMLInputElement)
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
  const addForm = document.getElementById("addForm") as HTMLFormElement;
  addForm.reset();
}

window.addEventListener("load", () => {
  loadFromLocalStorage();
});

const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
submitBtn.addEventListener("click", handleSubmit);

document
  .querySelector("#dataTable")
  ?.addEventListener("click", function (event) {
    if (event.target) {
      handleDelete(event);
      handleEdit(event);
    }
  });
