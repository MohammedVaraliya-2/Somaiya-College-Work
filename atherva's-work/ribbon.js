const topRibbon = document.querySelector('.ribbon.top');
const bottomRibbon = document.querySelector('.ribbon.bottom');
const fireworksCanvas = document.getElementById('fireworks-container');
const ctx = fireworksCanvas.getContext('2d');

fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

function createFireworks(x, y) {
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x,
            y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 5 + 2,
            size: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            life: Math.random() * 40 + 30,
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        particles.forEach((p, index) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            if (p.life <= 0) particles.splice(index, 1);
        });

        if (particles.length > 0) requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

function cutRibbon(event) {
    const cutPoint = event.clientX;

    anime({
        targets: topRibbon,
        translateX: `-${cutPoint}px`,
        duration: 1200,
        easing: 'easeInOutQuad',
        complete: () => {
            anime({
                targets: topRibbon,
                width: `${cutPoint}px`,
                duration: 600,
                easing: 'easeInOutQuad',
            });
        },
    });

    anime({
        targets: bottomRibbon,
        translateX: `-${cutPoint}px`,
        duration: 1200,
        easing: 'easeInOutQuad',
        complete: () => {
            anime({
                targets: bottomRibbon,
                width: `${cutPoint}px`,
                duration: 600,
                easing: 'easeInOutQuad',
            });
        },
    });

    anime({
        targets: topRibbon,
        translateX: [`${cutPoint}px`, `${window.innerWidth}px`],
        duration: 1200,
        easing: 'easeInOutQuad',
    });

    anime({
        targets: bottomRibbon,
        translateX: [`${cutPoint}px`, `${window.innerWidth}px`],
        duration: 1200,
        easing: 'easeInOutQuad',
    });

    createFireworks(cutPoint, window.innerHeight / 2);

    setTimeout(() => {
        window.location.href = "https://example.com";
    }, 1500);
}

document.body.addEventListener('click', cutRibbon);
