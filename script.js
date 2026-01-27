// Imports removed for local file compatibility
// import { projects, experience } from './data.js';

// --- Particle Animation Setup ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = '#66FCF1'; // Accent cyan

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacityValue = 1 - (distance / 20000);
                // Use new accent color for lines
                ctx.strokeStyle = 'rgba(102, 252, 241, ' + opacityValue + ')';
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
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// --- Portfolio Logic ---

// DOM Elements
const projectsGrid = document.getElementById('projects-grid');
// Removed: const experienceTimeline = document.getElementById('experience-timeline');
const modal = document.getElementById('project-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalStack = document.getElementById('modal-stack');
const modalGithub = document.getElementById('modal-github');
const modalImagePlaceholder = document.querySelector('.modal-image');

// Render Projects (Video on Hover)
function renderProjects() {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card" data-id="${project.id}">
            <div class="video-placeholder">
                <img src="${project.image}" alt="${project.title}">
                ${project.videoPreview ? `
                    <video loop muted playsinline>
                        <source src="${project.videoPreview}" type="video/mp4">
                        <source src="${project.videoPreview}" type="video/webm">
                    </video>
                ` : ''}
            </div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <div class="project-category">${project.category}</div>
                <div class="tech-stack">
                    ${project.stack.map(tech => `<span class="badge">${tech}</span>`).join('')}
                </div>
                <p class="card-summary">${project.summary}</p>
            </div>
        </article>
    `).join('');

    // Project Card Logic
    document.querySelectorAll('.project-card').forEach(card => {
        // Modal Click
        card.addEventListener('click', () => {
            const projectId = parseInt(card.dataset.id);
            const project = projects.find(p => p.id === projectId);
            if (project) openModal(project);
        });

        // Video Hover
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => video.play().catch(e => console.log('Autoplay prevented', e)));
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}

// Render Experience (Split Layout + Modal Click)
function renderExperience() {
    const homogeneousContainer = document.getElementById('homogeneous-content');
    const particularContainer = document.getElementById('particular-content');

    if (!homogeneousContainer || !particularContainer) return;

    const homogeneousData = education_experience.filter(item => item.type === 'homogeneous');
    const particularData = education_experience.filter(item => item.type === 'particular');

    const createCardHTML = (item, index) => `
        <div class="exp-card ${item.type}" data-index="${education_experience.indexOf(item)}">
            <h4>${item.title || item.role}</h4>
            <div class="exp-role">${item.institution || item.company}</div>
            <span class="exp-duration">${item.period}</span>
            <p class="exp-desc">${item.desc}</p>
        </div>
    `;

    homogeneousContainer.innerHTML = homogeneousData.map(createCardHTML).join('');
    particularContainer.innerHTML = particularData.map(createCardHTML).join('');

    // Add Click Listeners for Experience
    document.querySelectorAll('.exp-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            const item = education_experience[index];
            if (item) openExperienceModal(item);
        });
    });
}

// --- Project Modal Functions ---
function openModal(project) {
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;

    modalStack.innerHTML = project.stack.map(tech =>
        `<span class="badge">${tech}</span>`
    ).join('');

    if (project.github && project.github !== '#') {
        modalGithub.href = project.github;
        modalGithub.style.display = 'inline-block'; ff
        modalGithub.textContent = 'View on GitHub';
    } else {
        modalGithub.style.display = 'none';
    }

    // Video vs Image Logic
    if (project.videoPreview) {
        modalImagePlaceholder.innerHTML = `
            <video controls autoplay loop playsinline style="width:100%; height:100%; object-fit:cover;">
                <source src="${project.videoPreview}" type="video/mp4">
                <source src="${project.videoPreview}" type="video/webm">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        modalImagePlaceholder.innerHTML = `<img src="${project.image}" style="width:100%; height:100%; object-fit:cover;">`;
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// --- Experience Modal & Slideshow Logic ---
const expModal = document.getElementById('experience-modal');
const closeExpModalBtn = document.querySelector('.close-experience');
const slideshowImage = document.getElementById('slideshow-image');
const slideDots = document.getElementById('slide-dots');
let currentSlideIndex = 0;
let currentSlides = [];

// Allow global access to changeSlide for HTML buttons
window.changeSlide = function (n) {
    showSlide(currentSlideIndex + n);
};

function showSlide(index) {
    if (!currentSlides || currentSlides.length === 0) return;

    if (index >= currentSlides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = currentSlides.length - 1;
    else currentSlideIndex = index;

    slideshowImage.src = currentSlides[currentSlideIndex];

    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

function openExperienceModal(item) {
    // Populate Text
    document.getElementById('exp-modal-title').textContent = item.title || item.role;
    document.getElementById('exp-modal-company').textContent = item.institution || item.company;

    const descContainer = document.getElementById('experience-full-description');
    if (item.fullDescription) {
        descContainer.innerHTML = item.fullDescription;
    } else {
        descContainer.innerHTML = `<p>${item.desc}</p>`;
    }

    // Setup Slideshow
    currentSlides = item.slideshowImages || []; // Fallback if no images
    currentSlideIndex = 0;

    // Generate Dots
    slideDots.innerHTML = currentSlides.map((_, i) =>
        `<span class="dot" onclick="changeSlide(${i - currentSlideIndex})"></span>`
    ).join('');

    // Initial Show
    if (currentSlides.length > 0) {
        showSlide(0);
        document.querySelector('.slideshow-container').style.display = 'block';
    } else {
        document.querySelector('.slideshow-container').style.display = 'none';
    }

    expModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeExperienceModal() {
    expModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Event Listeners
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (closeExpModalBtn) closeExpModalBtn.addEventListener('click', closeExperienceModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
    if (e.target === expModal) closeExperienceModal();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateParticles();
    renderProjects();
    renderExperience();
});
