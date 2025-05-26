// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect - Dark glassmorphism
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(26, 27, 38, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            navbar.style.borderBottom = '1px solid rgba(82, 169, 255, 0.2)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 27, 38, 0.7)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(45, 55, 72, 0.5)';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    window.observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add scroll reveal to elements
    const revealElements = document.querySelectorAll('.service-card, .project-card, .timeline-item, .about-stats, .contact-item');
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        window.observer.observe(el);
    });

    // Typing animation for hero greeting
    const greetingText = document.querySelector('.greeting-text');
    if (greetingText) {
        const text = 'getStarted()';
        greetingText.textContent = '';
        
        let i = 0;
        function typeText() {
            if (i < text.length) {
                greetingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeText, 100);
            }
        }
        
        setTimeout(typeText, 1000);
    }

    // Download resume functionality
    const downloadBtn = document.getElementById('download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.classList.add('loading');
            
            // Simulate download delay
            setTimeout(() => {
                // Create download link
                const link = document.createElement('a');
                link.href = 'resume.pdf';
                link.download = 'Muhammad_Meluk_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Reset button
                this.innerHTML = originalText;
                this.classList.remove('loading');
                
                // Show success message
                showNotification('Resume downloaded successfully!', 'success');
            }, 1000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 90px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    padding: 16px 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    border-left: 4px solid #0080FF;
                }
                .notification-success {
                    border-left-color: #10B981;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #1E2329;
                    font-weight: 500;
                }
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Social links (you would replace these with actual links)
    const socialLinks = document.querySelectorAll('.social-link, .footer-social');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-facebook-f')) {
                // Replace with actual Facebook link
                window.open('https://facebook.com', '_blank');
            } else if (icon.classList.contains('fa-whatsapp')) {
                // WhatsApp direct message
                window.open('https://wa.me/201022723804', '_blank');
            } else if (icon.classList.contains('fa-github')) {
                // Replace with actual GitHub link
                window.open('https://github.com', '_blank');
            }
        });
    });

    // Contact phone and email click handlers
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            showNotification('Opening default application...', 'info');
        });
    });

    // Parallax effect for hero avatar - removed to fix sticking issue

    // Tech stack item hover effect
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Project card click to open link
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.project-link')) {
                const link = this.querySelector('.project-link');
                if (link) {
                    window.open(link.href, '_blank');
                }
            }
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
    });

    // Animate statistics on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue.includes('+')) {
                    const number = parseInt(finalValue);
                    animateNumber(target, 0, number, 1000, '+');
                } else if (finalValue === 'C1') {
                    // Special case for C1
                    target.textContent = 'C1';
                } else {
                    const number = parseInt(finalValue);
                    if (!isNaN(number)) {
                        animateNumber(target, 0, number, 1000);
                    }
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateNumber(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * easeOutQuad(progress));
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    // Copy contact info to clipboard
    const contactLinks = document.querySelectorAll('.contact-details a');
    contactLinks.forEach(link => {
        if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) {
            link.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification(`${text} copied to clipboard!`, 'success');
                }).catch(() => {
                    showNotification('Failed to copy to clipboard', 'error');
                });
            });
        }
    });

    // Add loading animation to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon && icon.classList.contains('fa-external-link-alt')) {
                icon.className = 'fas fa-spinner fa-spin';
                setTimeout(() => {
                    icon.className = 'fas fa-external-link-alt';
                }, 2000);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Initialize fade-in animation for hero content
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-location, .hero-description, .hero-buttons, .hero-social');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll events
    const debouncedUpdateNav = debounce(updateActiveNav, 10);
    window.removeEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', debouncedUpdateNav);

    // Load dynamic content and update counters
    Promise.all([loadCertificates(), loadProjects()]).then(() => {
        updateCounters();
    });

    console.log('Muhammad Meluk Portfolio - Loaded successfully! 🚀');
});

// Update counters based on loaded data
async function updateCounters() {
    try {
        const [certificatesResponse, projectsResponse] = await Promise.all([
            fetch('data/certificates.json'),
            fetch('data/projects.json')
        ]);
        
        if (certificatesResponse.ok && projectsResponse.ok) {
            const certificates = await certificatesResponse.json();
            const projects = await projectsResponse.json();
            
            // Update certificates counter
            const certificatesCounter = document.querySelector('.stat-item:nth-child(2) .stat-number');
            if (certificatesCounter) {
                certificatesCounter.textContent = certificates.length;
            }
            
            // Update projects counter
            const projectsCounter = document.querySelector('.stat-item:nth-child(1) .stat-number');
            if (projectsCounter) {
                projectsCounter.textContent = projects.length + '+';
            }
            
            console.log(`Counters updated: ${projects.length} projects, ${certificates.length} certificates`);
        }
    } catch (error) {
        console.error('Error updating counters:', error);
    }
}

// Load certificates from JSON
async function loadCertificates() {
    try {
        const response = await fetch('data/certificates.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const certificates = await response.json();
        const timeline = document.querySelector('.education-timeline');
        
        if (!timeline) {
            console.error('Education timeline element not found');
            return;
        }
        
        // Clear existing content (except the closing comment)
        const closingComment = timeline.querySelector('.code-comment');
        timeline.innerHTML = '';
        
        certificates.forEach(cert => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item scroll-reveal';
            
            timelineItem.innerHTML = `
                <div class="timeline-date">${cert.date}</div>
                <div class="timeline-content">
                    <h3>${cert.title}</h3>
                    <p class="timeline-institution">${cert.institution}</p>
                    <p class="timeline-score">Score: ${cert.score}</p>
                    ${cert.link ? `
                        <a href="${cert.link}" class="timeline-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> View Certificate
                        </a>
                    ` : ''}
                </div>
            `;
            
            timeline.appendChild(timelineItem);
            
            // Add to observer for scroll reveal
            if (window.observer) {
                window.observer.observe(timelineItem);
            }
        });
        
        // Re-add the closing comment
        if (closingComment) {
            timeline.appendChild(closingComment);
        }
        
        console.log('Certificates loaded successfully');
        
    } catch (error) {
        console.error('Error loading certificates:', error);
        // Fallback: keep existing static content
    }
}

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        const portfolioGrid = document.getElementById('portfolio-grid');
        
        if (!portfolioGrid) {
            console.error('Portfolio grid element not found');
            return;
        }
        
        // Clear existing content (except the closing comment)
        const closingComment = portfolioGrid.querySelector('.code-comment');
        portfolioGrid.innerHTML = '';
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card scroll-reveal';
            projectCard.style.cursor = 'pointer';
            
            const techTags = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
            
            projectCard.innerHTML = `
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                    <a href="${project.link}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> View Live
                    </a>
                </div>
            `;
            
            // Add click handler for the card
            projectCard.addEventListener('click', function(e) {
                if (!e.target.closest('.project-link')) {
                    const link = this.querySelector('.project-link');
                    if (link) {
                        window.open(link.href, '_blank');
                    }
                }
            });
            
            portfolioGrid.appendChild(projectCard);
            
            // Add to observer for scroll reveal
            if (window.observer) {
                window.observer.observe(projectCard);
            }
        });
        
        // Re-add the closing comment
        if (closingComment) {
            portfolioGrid.appendChild(closingComment);
        }
        
        console.log('Projects loaded successfully');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback: keep existing static content
    }
}
