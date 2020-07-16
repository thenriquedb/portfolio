/*
 * Welcome message type writter effect
 */

function typeWritter(element) {
  const content = element.innerHTML;
  element.innerHTML = "";
  const textArr = content.split("");

  textArr.forEach((letter, index) =>
    setTimeout(() => (element.innerHTML += letter), 75 * index)
  );
}
const message = document.querySelector(".welcome-container h2");
typeWritter(message);

/*
 * Smooth scroll
 */
const arrowButton = document.getElementById("arrow-button");
arrowButton.addEventListener("click", handleArrowClick);

function handleArrowClick(event) {
  event.preventDefault();

  const to = document.getElementById("Quem sou eu?").offsetTop;

  // Check if the browser has have native support for Scroll Behavior
  if ("ScrollBehavior" in document.documentElement.style) {
    window.scroll({
      top: to,
      behavior: "smooth",
    });
  } else {
    smoothScrollTo(0, to);
  }
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration = 400) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}

/*
 *  Project card hover effect
 */
let projects = document.querySelectorAll(".project .image-wrapper");

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

/*
 * Form
 */
const form = document.querySelector("form");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const submitButton = event.target.querySelector("button");
  submitButton.disabled = true;
  submitButton.innerText = "Enviando...";

  const name = event.target.name.value;
  const email = event.target.email.value;
  const message = event.target.message.value;
  const service = event.target.service.value;

  // Remove previous request status message
  const successStatusMessage = document.getElementById("success-message");
  const errorStatusMessage = document.getElementById("error-message");

  successStatusMessage.style.display = "none";
  errorStatusMessage.style.display = "none";

  const body = { name, email, service, message };

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  };

  fetch("https://thiagodomingues-portfolio.herokuapp.com/send", config)
    .then((res) => res.json())
    .then((json) => {
      submitButton.disabled = false;
      submitButton.innerText = "Enviar";

      event.target.name.value = "";
      event.target.email.value = "";
      event.target.message.value = "";
      event.target.service.value = "site";

      successStatusMessage.style.display = "flex";
    })
    .catch((err) => {
      submitButton.disabled = false;
      submitButton.innerText = "Enviar";

      errorStatusMessage.style.display = "flex";
    });
}
