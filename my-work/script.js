document.addEventListener("DOMContentLoaded", () => {
  const ribbon = document.getElementById("ribbon");
  const logo = document.getElementById("logo");
  const fireworksContainer = document.getElementById("fireworks");

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

    leftHalf.style.animation = "slideLeft 2s forwards";
    rightHalf.style.animation = "slideRight 2s forwards";

    setTimeout(() => {
      leftHalf.remove();
      rightHalf.remove();
    }, 2000);

    startFireworks(event.clientX, event.clientY);

    setTimeout(() => {
      logo.classList.add("centered");
    }, 1000);
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
