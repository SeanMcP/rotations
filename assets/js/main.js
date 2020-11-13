import el from "./el.js";
import { get } from "./search-params.js";

(function main() {
  // Code
  const rotationsTable = document.getElementById("rotations-table");
  const addRotationButton = document.getElementById("add-rotation");

  function addRotation({ length, color } = {}) {
    const row = document.createElement("tr");
    row.classList.add("rotation");

    const lengthCell = el("td");
    const lengthInput = el("input", {
      "aria-label": "Length",
      max: 60,
      min: 1,
      name: "r",
      placeholder: 12,
      required: true,
      type: "number",
      value: length ? length : null,
    });
    lengthCell.appendChild(lengthInput);
    row.appendChild(lengthCell);

    const colorCell = el("td");
    const colorSelect = el("select", {
      "aria-label": "Color",
      name: "c",
    });
    ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].forEach((label) => {
      const value = label[0].toLowerCase();
      colorSelect.innerHTML += `<option value="${value}" ${
        color && value === color ? "selected" : ""
      }>${label}</option>`;
    });
    colorCell.appendChild(colorSelect);
    row.appendChild(colorCell);

    const deleteCell = el("td");
    const deleteButton = el("button", {
      class: "button subtle",
      textContent: "Delete",
    });
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      row.remove();
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    rotationsTable.appendChild(row);
  }

  addRotationButton.addEventListener("click", (event) => {
    event.preventDefault();
    addRotation();
  });

  const params = get();
  if (params.edit) {
    document.querySelector('[name="n"]').value = params.note;
    document.querySelector('[name="t"]').value = params.transition;
    params.rotations.forEach(addRotation);
  } else {
    addRotation();
  }
})();
