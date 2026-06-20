// ===============================
// FUTURISTIC PORTFOLIO JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // LOADER
    // ===============================

    const loader = document.querySelector(".loader");

    if (loader) {
        window.addEventListener("load", () => {
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";

            setTimeout(() => {
                loader.remove();
            }, 600);
        });
    }

    // ===============================
    // SCROLL REVEAL
    // ===============================

    const reveals = document.querySelectorAll(
        ".reveal, .skill-card, .project-card, .card"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    // ===============================
    // MOUSE GLOW EFFECT
    // ===============================

    const glow = document.querySelector(".mouse-glow");

    document.addEventListener("mousemove", (e) => {

        if (!glow) return;

        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });

    // ===============================
    // PARTICLE BACKGROUND
    // ===============================

    const canvas = document.getElementById("particles");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];

        class Particle {

            constructor() {

                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;

                this.size = Math.random() * 3 + 1;

                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
            }

            update() {

                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;

                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {

                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = "rgba(0,229,255,0.8)";
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {

            for (let a = 0; a < particles.length; a++) {

                for (let b = a; b < particles.length; b++) {

                    const dx =
                        particles[a].x - particles[b].x;

                    const dy =
                        particles[a].y - particles[b].y;

                    const distance =
                        Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {

                        ctx.strokeStyle =
                            `rgba(0,229,255,${
                                1 - distance / 120
                            })`;

                        ctx.lineWidth = 0.4;

                        ctx.beginPath();

                        ctx.moveTo(
                            particles[a].x,
                            particles[a].y
                        );

                        ctx.lineTo(
                            particles[b].x,
                            particles[b].y
                        );

                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            connectParticles();

            requestAnimationFrame(
                animateParticles
            );
        }

        animateParticles();

        window.addEventListener(
            "resize",
            () => {

                canvas.width =
                    window.innerWidth;

                canvas.height =
                    window.innerHeight;
            }
        );
    }

    // ===============================
    // NAVBAR SCROLL EFFECT
    // ===============================

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener(
        "scroll",
        () => {

            if (!navbar) return;

            if (window.scrollY > 50) {

                navbar.style.backdropFilter =
                    "blur(25px)";

                navbar.style.background =
                    "rgba(10,15,25,0.7)";
            } else {

                navbar.style.background =
                    "rgba(255,255,255,0.06)";
            }
        }
    );

    // ===============================
    // COUNTER ANIMATION
    // ===============================

    const counters =
        document.querySelectorAll(".counter");

    counters.forEach((counter) => {

        const updateCounter = () => {

            const target =
                +counter.dataset.target;

            const current =
                +counter.innerText;

            const increment =
                target / 80;

            if (current < target) {

                counter.innerText =
                    Math.ceil(
                        current + increment
                    );

                setTimeout(
                    updateCounter,
                    20
                );
            } else {

                counter.innerText =
                    target;
            }
        };

        updateCounter();
    });

    // ===============================
    // SKILL BAR ANIMATION
    // ===============================

    const progressBars =
        document.querySelectorAll(
            ".progress-bar"
        );

    progressBars.forEach((bar) => {

        const progress =
            bar.dataset.progress;

        setTimeout(() => {

            bar.style.width =
                progress + "%";

        }, 500);
    });

    // ===============================
    // RIPPLE BUTTON EFFECT
    // ===============================

    const buttons =
        document.querySelectorAll(
            ".btn"
        );

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function (e) {

                const ripple =
                    document.createElement(
                        "span"
                    );

                const rect =
                    this.getBoundingClientRect();

                ripple.style.left =
                    e.clientX -
                    rect.left +
                    "px";

                ripple.style.top =
                    e.clientY -
                    rect.top +
                    "px";

                ripple.classList.add(
                    "ripple-effect"
                );

                this.appendChild(
                    ripple
                );

                setTimeout(() => {

                    ripple.remove();

                }, 600);
            }
        );
    });

    // ===============================
    // CONTACT FORM
    // ===============================

    const form =
        document.querySelector("form");

    if (form) {

        form.addEventListener(
            "submit",
            (e) => {

                e.preventDefault();

                alert(
                    "Message sent successfully!"
                );

                form.reset();
            }
        );
    }

    // ===============================
    // ACTIVE NAV LINKS
    // ===============================

    const sections =
        document.querySelectorAll(
            "section"
        );

    const navLinks =
        document.querySelectorAll(
            "nav a"
        );

    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(
                (section) => {

                    const sectionTop =
                        section.offsetTop;

                    if (
                        pageYOffset >=
                        sectionTop - 200
                    ) {

                        current =
                            section.getAttribute(
                                "id"
                            );
                    }
                }
            );

            navLinks.forEach(
                (link) => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        "#" + current
                    ) {

                        link.classList.add(
                            "active"
                        );
                    }
                }
            );
        }
    );

});

// ===============================
// CONSOLE MESSAGE
// ===============================

console.log(
    "%cPortfolio Developed By Abhinandana 🚀",
    "color:#00e5ff;font-size:16px;font-weight:bold;"
);