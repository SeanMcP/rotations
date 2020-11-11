import { get } from "./search-params.js";

(function main() {
  // Code
  const rotationsEl = document.getElementById("rotations");
  const addRotationButton = document.getElementById("add-rotation");

  function addRotation({ length, color } = {}) {
    const li = document.createElement("li");
    li.classList.add("rotation");
    const fieldEl = document.createElement("div");
    fieldEl.classList.add("field");
    li.appendChild(fieldEl);

    const lengthLabel = document.createElement("label");
    const lengthB = document.createElement("b");
    lengthB.textContent = "Minutes";
    lengthLabel.appendChild(lengthB);
    const lengthInput = document.createElement("input");
    lengthInput.max = 60;
    lengthInput.min = 1;
    lengthInput.name = "r";
    lengthInput.placeholder = "12";
    lengthInput.type = "number";
    if (length) lengthInput.value = length;
    lengthLabel.appendChild(lengthInput);
    fieldEl.appendChild(lengthLabel);

    const colorLabel = document.createElement("label");
    const colorB = document.createElement("b");
    colorB.textContent = "Color";
    colorLabel.appendChild(colorB);
    const colorSelect = document.createElement("select");
    colorSelect.name = "c";
    ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].forEach((label) => {
      const value = label[0].toLowerCase();
      colorSelect.innerHTML += `<option value="${value}" ${
        color && value === color ? "selected" : ""
      }>${label}</option>`;
    });
    colorLabel.appendChild(colorSelect);
    fieldEl.appendChild(colorLabel);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button", "subtle");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      fieldEl.remove();
    });
    fieldEl.appendChild(deleteButton);

    rotationsEl.appendChild(li);
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
