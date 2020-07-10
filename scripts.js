let projects = document.querySelectorAll(".project .image-wrapper");

// Animation of project overlay
projects.forEach((project, index) => {
  project.addEventListener("mouseover", () => {
    let overlay = project.querySelector(`.overlay-${index + 1}`);
    overlay.classList.add("activated-overlay");
  });

  project.addEventListener("mouseout", () => {
    let overlay = project.querySelector(`.overlay-${index + 1}`);
    overlay.classList.remove("activated-overlay");
  });
});
