import { get } from './search-params.js'

(function main() {
  // Code
  const { note, transition, rotations } = get()

  const editAnchor = document.getElementById('edit')
  editAnchor.href += location.search + '&edit=true'

  let currentRotation = 0;
  let currentTime = Number(rotations[currentRotation].length);
  let state = "";
  function setState(nextState) {
    state = nextState;
    document.body.dataset.state = state;
    if (state === "rotation") {
      document.body.dataset.color = rotations[currentRotation].color;
    } else {
      document.body.removeAttribute("data-color");
    }
  }
  setState("rotation");

  if (note) {
    const noteEl = document.getElementById("note");
    noteEl.removeAttribute("hidden");
    noteEl.innerHTML += `<p>${note.replace(/\n/g, "<br>")}</p>`;
  }

  const rotationsUlEl = document.getElementById("rotations");
  for (let i = 0; i < rotations.length; i++) {
    rotationsUlEl.innerHTML += `<li data-rotation=${i}>Rotation ${i + 1}</li>`;
    if (i < rotations.length - 1) {
      rotationsUlEl.innerHTML += `<li data-transition=${i}>Transition</li>`;
    }
  }
  function setCurrentRotationIndicator() {
    rotationsUlEl.childNodes.forEach((node) =>
      node.removeAttribute("aria-current")
    );
    rotationsUlEl
      .querySelector(`[data-${state}="${currentRotation}"]`)
      .setAttribute("aria-current", true);
  }
  setCurrentRotationIndicator()

  // TODO: Remove
  console.log({ note, transition, rotations });

  const displayEl = document.getElementById("display");
  const startButtonEl = document.getElementById("start");
  const pauseButtonEl = document.getElementById("pause");

  displayEl.textContent = currentTime;

  function tick() {
    currentTime--;
    switch (state) {
      case "rotation": {
        if (currentTime < 0) {
          if (currentRotation === rotations.length - 1) {
            // TODO: End
            return clearInterval(window._interval);
            break;
          }
          // Move to transition
          setState("transition");
          currentTime = transition;
          setCurrentRotationIndicator();
        }
        break;
      }
      case "transition": {
        if (currentTime < 0) {
          // Move to next rotation
          currentRotation++;
          currentTime = Number(rotations[currentRotation].length);
          setState("rotation");
          setCurrentRotationIndicator();
        }
        break;
      }
    }
    displayEl.textContent = currentTime;
  }

  startButtonEl.addEventListener("click", (event) => {
    event.preventDefault();
    startButtonEl.hidden = true;
    pauseButtonEl.removeAttribute("hidden");
    // TODO: Start timer
    window._interval = setInterval(tick, 1000);
  });

  pauseButtonEl.addEventListener("click", (event) => {
    event.preventDefault();
    pauseButtonEl.hidden = true;
    startButtonEl.removeAttribute("hidden");
    // TODO: Pause timer
    clearInterval(window._interval);
  });
})();
