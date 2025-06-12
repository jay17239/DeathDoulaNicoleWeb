// Death Doula Nicole Website - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                }
            });
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                });
            }
        });
    });
    
    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for fixed navbar
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqIcon = this.querySelector('.faq-icon');
            
            // Close other open FAQ items
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.closest('.faq-item');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherQuestion.querySelector('.faq-icon');
                
                if (otherItem !== faqItem && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ item
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
                faqIcon.style.transform = 'rotate(0deg)';
            } else {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                faqIcon.style.transform = 'rotate(45deg)';
            }
        });
    });
    
    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Clear previous error styles
            clearErrorStyles();
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
                
                // Here you would normally submit the form
                // For now, we'll just reset it
                contactForm.reset();
            }
        });
    }
    
    // Utility Functions
    function showError(input, message) {
        input.style.borderColor = '#e74c3c';
        input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
        
        // Create or update error message
        let errorMsg = input.parentNode.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#e74c3c';
            errorMsg.style.fontSize = '0.9rem';
            errorMsg.style.marginTop = '0.5rem';
            errorMsg.style.display = 'block';
            input.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }
    
    function clearErrorStyles() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
            
            const errorMsg = input.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessMessage() {
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `
            <div style="
                background-color: #d4edda;
                color: #155724;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                border: 1px solid #c3e6cb;
            ">
                <strong>Thank you!</strong> Your message has been sent. I'll get back to you soon.
            </div>
        `;
        
        // Insert at the top of the form
        contactForm.insertBefore(successMsg.firstElementChild, contactForm.firstElementChild);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            const successDiv = contactForm.querySelector('div[style*="background-color: #d4edda"]');
            if (successDiv) {
                successDiv.remove();
            }
        }, 5000);
    }
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 20px rgba(122, 76, 43, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(122, 76, 43, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Gentle animations for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and other elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .blog-card, .resource-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Keyboard accessibility for custom elements
    document.addEventListener('keydown', function(e) {
        // Handle Enter key on FAQ questions
        if (e.target.classList.contains('faq-question') && e.key === 'Enter') {
            e.target.click();
        }
        
        // Handle Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }
    });
});

// Add ARIA attributes for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA attributes to FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((question, index) => {
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${index}`);
        
        const answer = question.nextElementSibling;
        if (answer) {
            answer.setAttribute('id', `faq-answer-${index}`);
        }
    });
    
    // Update ARIA attributes when FAQ items are toggled
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.closest('.faq-item').classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded.toString());
        });
    });
}); 