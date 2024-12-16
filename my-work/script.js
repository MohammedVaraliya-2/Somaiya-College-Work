document.addEventListener("DOMContentLoaded", () => {
  const ribbon = document.getElementById("ribbon");
  const logo = document.getElementById("logo");
  const fireworksContainer = document.getElementById("fireworks");
  const loginPage = document.getElementById("login-page");

  const clapAudio = new Audio(
    "assets/audios/mixkit-small-crowd-clapping-3035.wav"
  );

  ribbon.addEventListener("click", (event) => {
    const ribbonRect = ribbon.getBoundingClientRect();
    const clickX = event.clientX - ribbonRect.left;

    const leftHalf = document.createElement("div");
    const rightHalf = document.createElement("div");

    leftHalf.classList.add("ribbon-half", "left");
    rightHalf.classList.add("ribbon-half", "right");

    leftHalf.style.width = `${clickX}px`;
    rightHalf.style.width = `${ribbonRect.width - clickX}px`;

    leftHalf.style.left = `${ribbonRect.left}px`;
    rightHalf.style.left = `${ribbonRect.left + clickX}px`;

    const ribbonContainer = ribbon.parentElement;
    ribbonContainer.appendChild(leftHalf);
    ribbonContainer.appendChild(rightHalf);

    ribbon.style.display = "none";

    leftHalf.style.animation = "slideLeft 3s forwards";
    rightHalf.style.animation = "slideRight 3s forwards";

    setTimeout(() => {
      logo.classList.add("centered");

      // After the animation duration (2 seconds), redirect to the login page
      setTimeout(() => {
        window.location.href = "https://progression.quarkideas.com/login"; // Redirect to the login page
      }, 2000); // 2000ms is the duration of the logo animation (adjust if needed)
    }, 3000); // Adjust to match ribbon animation duration

    setTimeout(() => {
      leftHalf.remove();
      rightHalf.remove();
    }, 3000);

    startFireworks(event.clientX, event.clientY);

    clapAudio.play();
    setTimeout(() => {
      clapAudio.pause();
      clapAudio.currentTime = 0;
    }, 2500);

    setTimeout(() => {
      logo.classList.add("centered");
    }, 2000);
  });

  function startFireworks(x, y) {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F3FF33",
      "#FF33F3",
      "#33FFF3",
    ];
    const fireworkCount = 200;

    for (let i = 0; i < fireworkCount; i++) {
      const firework = document.createElement("div");
      firework.classList.add("firework");

      firework.style.setProperty("--x", `${Math.random() * 800 - 400}px`);
      firework.style.setProperty("--y", `${Math.random() * 800 - 400}px`);

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      firework.style.backgroundColor = randomColor;

      firework.style.left = `${x}px`;
      firework.style.top = `${y}px`;

      fireworksContainer.appendChild(firework);

      firework.addEventListener("animationend", () => firework.remove());
    }
  }
});
