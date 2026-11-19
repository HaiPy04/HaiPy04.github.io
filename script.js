// script.js - Robotics Simulation & Computer Vision Portfolio

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
    let numberOfParticles = (canvas.height * canvas.width) / 9500;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.8) - 0.4;
        let directionY = (Math.random() * 0.8) - 0.4;
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
                ctx.strokeStyle = 'rgba(102, 252, 241, ' + (opacityValue * 0.7) + ')';
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

// --- DOM Elements ---
const projectsGrid = document.getElementById('projects-grid');
const modal = document.getElementById('project-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalStack = document.getElementById('modal-stack');
const modalGithub = document.getElementById('modal-github');
const modalImagePlaceholder = document.querySelector('.modal-image');

// --- Mobile Navigation Toggle ---
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        navToggle.classList.toggle('is-active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking any nav anchor
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            navToggle.classList.remove('is-active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// --- Render Projects (Visual Hierarchy: Title -> Tech Stack -> Summary -> Links) ---
function renderProjects() {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card" data-id="${project.id}" tabindex="0" role="button" aria-label="Project: ${project.title}">
            <div class="video-placeholder">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                ${project.videoPreview ? `
                    <video loop muted playsinline preload="metadata">
                        <source src="${project.videoPreview}" type="video/webm">
                        <source src="${project.videoPreview}" type="video/mp4">
                    </video>
                    <span class="video-preview-badge">
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
                            <polygon points="6 4 20 12 6 20 6 4"/>
                        </svg>
                        <span>DEMO</span>
                    </span>
                ` : ''}
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span class="project-category">${project.category}</span>
                </div>
                <h3 class="card-title">${project.title}</h3>
                <div class="tech-stack" aria-label="Technologies used">
                    ${project.stack.map(tech => `<span class="badge">${tech}</span>`).join('')}
                </div>
                <p class="card-summary">${project.summary}</p>
                <div class="card-actions">
                    <button type="button" class="btn-card-action btn-view-demo" aria-label="View details and demo for ${project.title}">
                        <span>Details & Demo</span>
                        <span class="action-arrow" aria-hidden="true">&rarr;</span>
                    </button>
                    ${project.github && project.github !== '#' ? `
                        <a href="${project.github}" class="btn-card-action btn-card-github" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" aria-label="GitHub repository for ${project.title}">
                            <svg class="github-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            <span>Code</span>
                        </a>
                    ` : `
                        <span class="btn-card-action btn-card-restricted" title="Internal / Restricted Repository">
                            Private
                        </span>
                    `}
                </div>
            </div>
        </article>
    `).join('');

    // Project Card Logic & Listeners
    document.querySelectorAll('.project-card').forEach(card => {
        const projectId = parseInt(card.dataset.id);
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        // Modal Click Trigger
        card.addEventListener('click', () => openModal(project));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(project);
            }
        });

        // Hover Video Preview
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(() => {});
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}

// --- Render Experience (Homogeneous & Particular Solutions) ---
function renderExperience() {
    const homogeneousContainer = document.getElementById('homogeneous-content');
    const particularContainer = document.getElementById('particular-content');

    if (!homogeneousContainer || !particularContainer) return;

    const homogeneousData = education_experience.filter(item => item.type === 'homogeneous');
    const particularData = education_experience.filter(item => item.type === 'particular');

    const createCardHTML = (item) => `
        <div class="exp-card ${item.type}" data-index="${education_experience.indexOf(item)}" tabindex="0" role="button" aria-label="${item.title || item.role} at ${item.institution || item.company}">
            <div class="exp-header-row">
                <h4>${item.title || item.role}</h4>
                ${item.type === 'particular' ? '<span class="exp-badge">Active</span>' : ''}
            </div>
            <div class="exp-role">${item.institution || item.company}</div>
            <span class="exp-duration">${item.period}</span>
            <p class="exp-desc">${item.desc}</p>
            <div class="exp-footer-hint">
                <span>View details & media</span>
                <span class="hint-arrow">&rarr;</span>
            </div>
        </div>
    `;

    homogeneousContainer.innerHTML = homogeneousData.map(createCardHTML).join('');
    particularContainer.innerHTML = particularData.map(createCardHTML).join('');

    // Click & Keyboard Listeners for Experience Cards
    document.querySelectorAll('.exp-card').forEach(card => {
        const index = parseInt(card.dataset.index);
        const item = education_experience[index];
        if (!item) return;

        card.addEventListener('click', () => openExperienceModal(item));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openExperienceModal(item);
            }
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
        modalGithub.style.display = 'inline-flex';
        modalGithub.innerHTML = `
            <svg class="github-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>View on GitHub</span>
        `;
    } else {
        modalGithub.style.display = 'none';
    }

    // Video vs Image Modal Media
    if (project.videoPreview) {
        modalImagePlaceholder.innerHTML = `
            <video controls autoplay loop playsinline style="width:100%; height:100%; object-fit:contain; background:#000;">
                <source src="${project.videoPreview}" type="video/webm">
                <source src="${project.videoPreview}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        modalImagePlaceholder.innerHTML = `
            <img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:contain; background:#000;">
        `;
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    // Pause any active video
    const video = modalImagePlaceholder.querySelector('video');
    if (video) video.pause();
}

// --- Experience Modal & Slideshow Logic ---
const expModal = document.getElementById('experience-modal');
const closeExpModalBtn = document.querySelector('.close-experience');
const slideshowImage = document.getElementById('slideshow-image');
const slideDots = document.getElementById('slide-dots');
let currentSlideIndex = 0;
let currentSlides = [];

window.changeSlide = function (n) {
    showSlide(currentSlideIndex + n);
};

function showSlide(index) {
    if (!currentSlides || currentSlides.length === 0) return;

    if (index >= currentSlides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = currentSlides.length - 1;
    else currentSlideIndex = index;

    slideshowImage.src = currentSlides[currentSlideIndex];

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

function openExperienceModal(item) {
    document.getElementById('exp-modal-title').textContent = item.title || item.role;
    document.getElementById('exp-modal-company').textContent = item.institution || item.company;

    const descContainer = document.getElementById('experience-full-description');
    if (item.fullDescription) {
        descContainer.innerHTML = item.fullDescription;
    } else {
        descContainer.innerHTML = `<p>${item.desc}</p>`;
    }

    currentSlides = item.slideshowImages || [];
    currentSlideIndex = 0;

    slideDots.innerHTML = currentSlides.map((_, i) =>
        `<button class="dot ${i === 0 ? 'active' : ''}" onclick="showSlide(${i})" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');

    const slideContainer = document.querySelector('.slideshow-container');
    if (currentSlides.length > 0) {
        showSlide(0);
        slideContainer.style.display = 'block';
    } else {
        slideContainer.style.display = 'none';
    }

    expModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeExperienceModal() {
    expModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Global Modal & Key Event Listeners
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (closeExpModalBtn) closeExpModalBtn.addEventListener('click', closeExperienceModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
    if (e.target === expModal) closeExperienceModal();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('show')) closeModal();
        if (expModal.classList.contains('show')) closeExperienceModal();
    }
});

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateParticles();
    initMobileNavigation();
    renderProjects();
    renderExperience();
});
