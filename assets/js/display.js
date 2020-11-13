import { get } from "./search-params.js";

(function main() {
  // Code
  const { note, transition, rotations } = get();

  const editAnchor = document.getElementById("edit");
  editAnchor.href += location.search + "&edit=true";

  let currentRotation = 0;
  let currentTime = Number(rotations[currentRotation].lengthInSeconds);
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

  const rotationsList = document.getElementById("rotations-list");
  for (let i = 0; i < rotations.length; i++) {
    rotationsList.innerHTML += `<li data-rotation=${i}>Rotation ${i + 1}</li>`;
    if (i < rotations.length - 1) {
      rotationsList.innerHTML += `<li data-transition=${i}>Transition</li>`;
    }
  }
  function setCurrentRotationIndicator() {
    rotationsList.childNodes.forEach((node) =>
      node.removeAttribute("aria-current")
    );
    rotationsList
      .querySelector(`[data-${state}="${currentRotation}"]`)
      .setAttribute("aria-current", true);
  }
  setCurrentRotationIndicator();

  const displayEl = document.getElementById("display");
  const startButton = document.getElementById("start");
  const pauseButton = document.getElementById("pause");

  function setDisplay() {
    const m = Math.floor(currentTime / 60),
      s = currentTime - 60 * m;
    displayEl.textContent = m ? `${m} min` : `${s} sec`;
  }

  setDisplay();

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
          currentTime = Number(rotations[currentRotation].lengthInSeconds);
          setState("rotation");
          setCurrentRotationIndicator();
        }
        break;
      }
    }
    setDisplay();
  }

  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    startButton.hidden = true;
    pauseButton.removeAttribute("hidden");
    // TODO: Start timer
    window._interval = setInterval(tick, 1000);
  });

  pauseButton.addEventListener("click", (event) => {
    event.preventDefault();
    pauseButton.hidden = true;
    startButton.removeAttribute("hidden");
    // TODO: Pause timer
    clearInterval(window._interval);
  });

  const mainEl = document.getElementById("main");
  const enterFullscreenButton = document.getElementById("enter-fullscreen");
  const exitFullscreenButton = document.getElementById("exit-fullscreen");

  function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitIsFullScreen) {
      enterFullscreenButton.hidden = true;
      exitFullscreenButton.removeAttribute("hidden");
    } else {
      enterFullscreenButton.removeAttribute("hidden");
      exitFullscreenButton.hidden = true;
    }
  }

  window.addEventListener("fullscreenchange", toggleFullscreen);
  window.addEventListener("webkitfullscreenchange", toggleFullscreen);

  enterFullscreenButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (mainEl.webkitRequestFullscreen) {
      mainEl.webkitRequestFullscreen();
    } else {
      await mainEl.requestFullscreen();
    }
    toggleFullscreen();
  });

  exitFullscreenButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else {
      document.exitFullscreen();
    }
    toggleFullscreen();
  });
})();
