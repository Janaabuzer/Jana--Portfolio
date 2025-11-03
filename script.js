// Initialize all interactive elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initParticles();
    initScrollProgress();
    initScrollToTop();
    initTimelineAnimation();
    initSkillsMap();
    initProjectCards();
    initContactForm();
    initSmoothScrolling();
    initScrollAnimations();
    
    console.log('✨ Portfolio initialized successfully!');
});

function initCustomCursor() {
    const cursor = document.querySelector('.liquid-cursor');
    const cursorTrail = [];
    const trailLength = 12;
    
    for (let i = 0; i < trailLength; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        document.body.appendChild(particle);
        cursorTrail.push({
            element: particle,
            x: 0,
            y: 0,
            delay: i * 3
        });
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
        createRipple(mouseX, mouseY);
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .flip-card, .skill-node');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'var(--gradient-2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--gradient-holographic)';
        });
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX - 15) * 0.1;
        cursorY += (mouseY - cursorY - 15) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorTrail.forEach((particle, index) => {
            setTimeout(() => {
                const trailX = mouseX - 3;
                const trailY = mouseY - 3;
                
                particle.element.style.left = trailX + 'px';
                particle.element.style.top = trailY + 'px';
                particle.element.style.opacity = 1 - (index / trailLength);
                particle.element.style.transform = `scale(${1 - (index / trailLength)})`;
            }, particle.delay);
        });
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-particle';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.background = 'var(--gradient-holographic)';
        ripple.style.animation = 'particleFade 0.6s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsla(${Math.random() * 360}, 70%, 60%, ${Math.random() * 0.3})`;
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            
            this.alpha = 0.2 + Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.3;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `hsla(${Math.random() * 360}, 70%, 60%, ${0.2 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

function initScrollToTop() {
    const fab = document.getElementById('scrollToTop');
    
    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            fab.style.opacity = '1';
            fab.style.visibility = 'visible';
        } else {
            fab.style.opacity = '0';
            fab.style.visibility = 'hidden';
        }
    });
}

function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

function initSkillsMap() {
    const canvas = document.getElementById('skills-canvas');
    const ctx = canvas.getContext('2d');
    const skillNodes = document.querySelectorAll('.skill-node');
    const modal = document.getElementById('skillModal');
    const closeModal = document.getElementById('closeModal');
    
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    const angleStep = (2 * Math.PI) / skillNodes.length;
    
    skillNodes.forEach((node, index) => {
        const angle = index * angleStep;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        node.style.left = (x - node.offsetWidth / 2) + 'px';
        node.style.top = (y - node.offsetHeight / 2) + 'px';
        
        node.addEventListener('click', () => {
            showSkillModal(node);
        });
    });
    
    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        skillNodes.forEach((node1, i) => {
            skillNodes.forEach((node2, j) => {
                if (i < j) {
                    const x1 = parseFloat(node1.style.left) + node1.offsetWidth / 2;
                    const y1 = parseFloat(node1.style.top) + node1.offsetHeight / 2;
                    const x2 = parseFloat(node2.style.left) + node2.offsetWidth / 2;
                    const y2 = parseFloat(node2.style.top) + node2.offsetHeight / 2;
                    
                    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    const maxDistance = 400;
                    
                    if (distance < maxDistance) {
                        const opacity = 0.3 * (1 - distance / maxDistance);
                        
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 107, 157, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }
            });
        });
        
        const pulse = (Math.sin(Date.now() * 0.002) + 1) * 0.5;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5 + pulse * 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 157, ${0.3 + pulse * 0.3})`;
        ctx.fill();
        
        skillNodes.forEach(node => {
            const x = parseFloat(node.style.left) + node.offsetWidth / 2;
            const y = parseFloat(node.style.top) + node.offsetHeight / 2;
            
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 107, 157, 0.1)';
            ctx.lineWidth = 1;
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
        });
    }
    
    function animateConnections() {
        drawConnections();
        requestAnimationFrame(animateConnections);
    }
    
    animateConnections();
    
    function showSkillModal(node) {
        const description = node.getAttribute('data-description');
        const experience = node.getAttribute('data-experience');
        const projects = node.getAttribute('data-projects');
        const tools = node.getAttribute('data-tools');
        
        document.getElementById('modalIcon').textContent = node.querySelector('.skill-icon').textContent;
        document.getElementById('modalTitle').textContent = node.querySelector('.skill-name').textContent;
        document.getElementById('modalLevel').textContent = node.querySelector('.skill-level').textContent;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalExperience').textContent = experience;
        document.getElementById('modalProjects').textContent = projects;
        
        const toolsContainer = document.getElementById('modalTools');
        toolsContainer.innerHTML = '';
        tools.split(', ').forEach(tool => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.textContent = tool;
            toolsContainer.appendChild(tag);
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideSkillModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeModal.addEventListener('click', hideSkillModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideSkillModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideSkillModal();
        }
    });
}

function initProjectCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.toggle('flipped');
        });
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
        
        card.setAttribute('tabindex', '0');
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'Message Sent! ✨';
            submitBtn.style.background = 'var(--gradient-3)';
            
            setTimeout(() => {
                this.reset();
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
    
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.hero-subtitle, .hero-description, .cta-group, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

window.addEventListener('scroll', throttle(() => {}, 16));
window.addEventListener('resize', debounce(() => {}, 250));

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('🎉 Portfolio fully loaded!');
});

window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});