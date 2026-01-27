// ===============================
// Particle Animation
// ===============================

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Particle {
    constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x <= 0 || this.x >= canvas.width) this.dx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.dy *= -1;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    const count = (canvas.width * canvas.height) / 9000;

    for (let i = 0; i < count; i++) {
        particlesArray.push(
            new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                (Math.random() - 0.5),
                (Math.random() - 0.5),
                Math.random() * 2 + 1,
                '#66FCF1'
            )
        );
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = dx * dx + dy * dy;

            if (distance < 20000) {
                ctx.strokeStyle = `rgba(102,252,241,${1 - distance / 20000})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    connectParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// ===============================
// Portfolio Projects
// ===============================

const projectsGrid = document.getElementById('projects-grid');
const modal = document.getElementById('project-modal');
const closeModalBtn = document.querySelector('.close-modal');

const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalStack = document.getElementById('modal-stack');
const modalGithub = document.getElementById('modal-github');
const modalMedia = document.querySelector('.modal-image');

function renderProjects() {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card" data-id="${project.id}">
            <div class="video-placeholder">
                <img src="${project.image}" alt="${project.title}">
                ${project.videoPreview ? `
                    <video muted loop playsinline preload="metadata">
                        <source src="${project.videoPreview}" type="video/mp4">
                    </video>
                ` : ''}
            </div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <div class="project-category">${project.category}</div>
                <div class="tech-stack">
                    ${project.stack.map(t => `<span class="badge">${t}</span>`).join('')}
                </div>
                <p class="card-summary">${project.summary}</p>
            </div>
        </article>
    `).join('');

    document.querySelectorAll('.project-card').forEach(card => {
        const video = card.querySelector('video');

        if (video) {
            card.addEventListener('mouseenter', () => video.play().catch(() => { }));
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }

        card.addEventListener('click', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }

            const project = projects.find(p => p.id === Number(card.dataset.id));
            if (project) openModal(project);
        });
    });
}

// ===============================
// Project Modal
// ===============================

function openModal(project) {
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;

    modalStack.innerHTML = project.stack
        .map(t => `<span class="badge">${t}</span>`)
        .join('');

    if (project.github) {
        modalGithub.href = project.github;
        modalGithub.style.display = 'inline-block';
    } else {
        modalGithub.style.display = 'none';
    }

    if (project.videoPreview) {
        modalMedia.innerHTML = `
            <video controls autoplay loop playsinline>
                <source src="${project.videoPreview}" type="video/mp4">
            </video>
        `;
    } else {
        modalMedia.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const video = modalMedia.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    modal.classList.remove('show');
    document.body.style.overflow = '';
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});

// ===============================
// Init
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateParticles();
    renderProjects();
});
