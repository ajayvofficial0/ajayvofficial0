// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to skill cards when they come into view
    const skillCards = document.querySelectorAll('#skills .bg-white');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to add animation class when element is in viewport
    function handleScrollAnimation() {
        skillCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate-fade-in');
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showError('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Form data
            const formData = new FormData(contactForm);
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            // Send form data using fetch API
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(data => {
                // Success
                contactForm.reset();
                showSuccess();
            })
            .catch(error => {
                // Error
                showError('There was a problem sending your message. Please try again later.');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
    
    function showSuccess() {
        formStatus.classList.remove('hidden');
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.classList.add('hidden');
            successMessage.classList.add('hidden');
        }, 5000);
    }
    
    function showError(message) {
        formStatus.classList.remove('hidden');
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
        
        if (message) {
            errorMessage.textContent = message;
        } else {
            errorMessage.textContent = 'Oops! Something went wrong. Please try again later.';
        }
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            formStatus.classList.add('hidden');
            errorMessage.classList.add('hidden');
        }, 5000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('#projects .bg-white');
    
    projectCards.forEach(card => {
        card.classList.add('hover-scale');
    });
    
    // Add social icon hover effect
    const socialIcons = document.querySelectorAll('footer a, #about a');
    
    socialIcons.forEach(icon => {
        icon.classList.add('social-icon');
    });
    
    // Dark mode functionality
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Check for saved theme preference or use system preference
    if (currentTheme) {
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        toggleSwitch.checked = currentTheme === 'dark';
    } else {
        // If no theme is stored, check system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-mode');
            toggleSwitch.checked = true;
        }
    }

    // Function to switch theme
    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            
            // Update text colors in Get to Know Me section for dark mode
            updateGetToKnowMeColors(true);
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            
            // Update text colors in Get to Know Me section for light mode
            updateGetToKnowMeColors(false);
        }
    }
    
    // Function to update Get to Know Me section colors based on theme
    function updateGetToKnowMeColors(isDarkMode) {
        const tabContent = document.querySelector('.tab-content');
        const tabPanes = document.querySelectorAll('.tab-pane');
        const tabButtons = document.querySelectorAll('.tab-btn');
        const headings = document.querySelectorAll('.tab-content h3, .tab-content h4');
        const paragraphs = document.querySelectorAll('.tab-content p');
        const interestCards = document.querySelectorAll('.tab-pane#interests .bg-blue-50');
        
        if (isDarkMode) {
            // Dark mode colors
            tabContent.style.backgroundColor = 'var(--tab-content-bg)';
            tabContent.style.color = 'var(--text-primary)';
            
            headings.forEach(heading => {
                heading.classList.remove('text-gray-800');
                heading.classList.add('text-gray-100');
            });
            
            paragraphs.forEach(p => {
                p.classList.remove('text-gray-600');
                p.classList.add('text-gray-300');
            });
            
            tabButtons.forEach(btn => {
                btn.style.backgroundColor = 'var(--tab-bg)';
                btn.style.color = 'var(--text-primary)';
            });
            
            interestCards.forEach(card => {
                card.style.backgroundColor = 'var(--interest-card-bg)';
            });
        } else {
            // Light mode colors
            tabContent.style.backgroundColor = 'var(--tab-content-bg)';
            tabContent.style.color = 'var(--text-primary)';
            
            headings.forEach(heading => {
                heading.classList.remove('text-gray-100');
                heading.classList.add('text-gray-800');
            });
            
            paragraphs.forEach(p => {
                p.classList.remove('text-gray-300');
                p.classList.add('text-gray-600');
            });
            
            tabButtons.forEach(btn => {
                btn.style.backgroundColor = 'var(--tab-bg)';
                btn.style.color = 'var(--text-primary)';
            });
            
            interestCards.forEach(card => {
                card.style.backgroundColor = 'var(--interest-card-bg)';
            });
        }
        
        // Update contact form labels
        const contactLabels = document.querySelectorAll('#contact form label');
        contactLabels.forEach(label => {
            if (isDarkMode) {
                label.classList.remove('text-gray-700');
                label.classList.add('text-gray-300');
            } else {
                label.classList.remove('text-gray-300');
                label.classList.add('text-gray-700');
            }
        });
    }

    // Event listener for theme switch
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    // Initialize colors based on current theme
    updateGetToKnowMeColors(document.body.classList.contains('dark-mode'));

    // Animate the bulb on hover
    const themeSwitch = document.querySelector('.theme-switch');
    themeSwitch.addEventListener('mouseenter', function() {
        const lightIcon = document.querySelector('.light-icon');
        const darkIcon = document.querySelector('.dark-icon');
        
        if (toggleSwitch.checked) {
            lightIcon.classList.add('animate-pulse');
        } else {
            darkIcon.classList.add('animate-pulse');
        }
    });
    
    themeSwitch.addEventListener('mouseleave', function() {
        const lightIcon = document.querySelector('.light-icon');
        const darkIcon = document.querySelector('.dark-icon');
        
        lightIcon.classList.remove('animate-pulse');
        darkIcon.classList.remove('animate-pulse');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate-fade-in-up');
                
                // Animate section elements with delay
                const elementsToAnimate = section.querySelectorAll('h2, h3, p, .grid, .flex');
                elementsToAnimate.forEach((el, index) => {
                    const delay = index % 4;
                    el.classList.add('animate-fade-in-up', `delay-${delay}00`);
                });
            }
        });
        
        // Parallax effect for profile image
        const profileImage = document.querySelector('.about-image');
        if (profileImage) {
            const scrollPosition = window.scrollY;
            profileImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Scroll down indicator fade out on scroll
    const scrollDownIndicator = document.querySelector('.scroll-down-container');
    if (scrollDownIndicator) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 100) {
                scrollDownIndicator.style.opacity = '0';
            } else {
                scrollDownIndicator.style.opacity = '1';
            }
        });
    }
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    function switchTab(e) {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        e.currentTarget.classList.add('active');
        
        // Get the tab to show
        const tabId = e.currentTarget.getAttribute('data-tab');
        const tabToShow = document.getElementById(tabId);
        
        // Show the tab
        if (tabToShow) {
            tabToShow.classList.add('active');
        }
    }
    
    // Add click event to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.classList.add('animate-bounce');
            setTimeout(() => {
                icon.classList.remove('animate-bounce');
            }, 1000);
        });
    });
    
    // Auto-switch tabs every 5 seconds
    let tabIndex = 0;
    const autoSwitchTabs = setInterval(() => {
        if (!document.querySelector('.tab-header:hover')) {
            tabIndex = (tabIndex + 1) % tabButtons.length;
            tabButtons[tabIndex].click();
        }
    }, 5000);
    
    // Stop auto-switching when user interacts with tabs
    document.querySelector('.tab-header').addEventListener('mouseenter', () => {
        clearInterval(autoSwitchTabs);
    });
});

// Dark mode toggle functionality (if you want to add it)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // You would need to add appropriate dark mode styles in your CSS
} 