// Death Doula Nicole Website - Interactive Functionality with Sanity CMS Integration

// Import Sanity client functions
import { 
    getHeroData, 
    getAboutData, 
    getServices, 
    getFAQs, 
    getResourceCategories, 
    getContactData, 
    getSiteSettings, 
    getBlogPosts,
    urlFor,
    blocksToHtml,
    getTestimonials
} from './sanity-client.js';

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('DOM Content Loaded - Starting initialization with Sanity CMS');
    
    // Check if user just submitted the contact form
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        // Show success message and scroll to contact section
        setTimeout(() => {
            showFormSubmissionSuccess();
            document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 500);
    }
    
    // Make showHomePage globally available
    window.showHomePage = showHomePage;
    
    // Make showBlogPost globally available
    window.showBlogPost = showBlogPost;
    
    // Make showSanityBlogPost globally available
    window.showSanityBlogPost = showSanityBlogPost;
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('post');
        
        if (postId) {
            // Show blog post if URL has post parameter
            checkForBlogPost();
        } else {
            // Show home page if no post parameter
            showHomePage();
        }
    });
    
    // Initialize Sanity CMS content
    try {
        initializeSanityContent();
    } catch (error) {
        console.error('Error initializing Sanity content:', error);
        console.log('Falling back to static content');
    }
    
    // Wrap all initialization in try-catch to prevent other script errors from breaking our blog
    try {
        // Load blog posts from Sanity
        loadSanityBlogPosts();
        
        // Check if we're on a specific blog post page
        checkForBlogPost();
    } catch (error) {
        console.error('Error during blog initialization:', error);
        // Fallback to JSON blog posts
        loadBlogPosts();
    }
    
    try {
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
    } catch (error) {
        console.error('Error during navigation setup:', error);
    }
    
    try {
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
    } catch (error) {
        console.error('Error during FAQ setup:', error);
    }
    
    try {
        // Contact Form Validation
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                
                let isValid = true;
                
                // Clear previous error styles
                clearErrorStyles();
                
                // Validate name
                if (!name.value.trim()) {
                    e.preventDefault();
                    showError(name, 'Name is required');
                    isValid = false;
                }
                
                // Validate email
                if (!email.value.trim()) {
                    e.preventDefault();
                    showError(email, 'Email is required');
                    isValid = false;
                } else if (!isValidEmail(email.value)) {
                    e.preventDefault();
                    showError(email, 'Please enter a valid email address');
                    isValid = false;
                }
                
                // Validate message
                if (!message.value.trim()) {
                    e.preventDefault();
                    showError(message, 'Message is required');
                    isValid = false;
                }
                
                // Only prevent submission if validation fails
                if (!isValid) {
                    e.preventDefault();
                    return;
                }
                
                // If validation passes, allow the form to submit to FormSubmit
                // The form will submit normally to https://formsubmit.co/Nicole@deathdoulanicole.com
            });
        }
    } catch (error) {
        console.error('Error during contact form setup:', error);
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

// ========== SANITY CMS INTEGRATION ==========

// Initialize all Sanity content
async function initializeSanityContent() {
    console.log('Initializing Sanity CMS content...');
    
    try {
        // Load all sections in parallel for better performance
        const [heroData, aboutData, services, faqs, resourceCategories, contactData, siteSettings, testimonials] = await Promise.all([
            getHeroData(),
            getAboutData(), 
            getServices(),
            getFAQs(),
            getResourceCategories(),
            getContactData(),
            getSiteSettings(),
            getTestimonials()
        ]);
        
        console.log('Sanity data loaded:', { heroData, aboutData, services, faqs, resourceCategories, contactData, siteSettings, testimonials });
        
        // Update each section
        if (heroData) updateHeroSection(heroData);
        if (aboutData) updateAboutSection(aboutData);
        if (services && services.length > 0) updateServicesSection(services);
        if (faqs && faqs.length > 0) updateFAQSection(faqs);
        if (resourceCategories && resourceCategories.length > 0) updateResourcesSection(resourceCategories);
        if (testimonials && testimonials.length > 0) updateTestimonialsSection(testimonials);
        if (contactData) updateContactSection(contactData);
        if (siteSettings) updateSiteSettings(siteSettings);
        
    } catch (error) {
        console.error('Error loading Sanity content:', error);
    }
}

// Update Testimonials Section
function updateTestimonialsSection(items) {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;
    grid.innerHTML = items.map(item => {
        const quote = item.quote || item.text || '';
        const author = item.author || item.name || '';
        const meta = item.meta || item.relation || item.location || '';
        return `
            <div class="testimonial-card">
                <p class="testimonial-quote">${quote}</p>
                ${author ? `<div class="testimonial-author">${author}</div>` : ''}
                ${meta ? `<div class="testimonial-meta">${meta}</div>` : ''}
            </div>
        `;
    }).join('');

    // Animate in (local observer)
    try {
        const localObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const cards = grid.querySelectorAll('.testimonial-card');
        cards.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            localObserver.observe(el);
        });
    } catch (e) {
        // If IntersectionObserver not supported, simply show cards
        const cards = grid.querySelectorAll('.testimonial-card');
        cards.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
}

// Update Hero Section
function updateHeroSection(data) {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const primaryBtn = document.querySelector('.hero-buttons .btn-primary');
    const secondaryBtn = document.querySelector('.hero-buttons .btn-secondary');
    const heroImage = document.querySelector('.butterfly-icon');
    
    if (heroTitle && data.title) heroTitle.textContent = data.title;
    if (heroSubtitle && data.subtitle) heroSubtitle.textContent = data.subtitle;
    if (primaryBtn && data.primaryButtonText) primaryBtn.textContent = data.primaryButtonText;
    if (secondaryBtn && data.secondaryButtonText) secondaryBtn.textContent = data.secondaryButtonText;
    if (heroImage && data.heroImage) heroImage.src = urlFor(data.heroImage);
}

// Update About Section
function updateAboutSection(data) {
    const sectionTitle = document.querySelector('#about .section-title');
    const introText = document.querySelector('.about-intro');
    const aboutContent = document.querySelector('.about-text');
    const headshot = document.querySelector('.headshot');
    
    if (sectionTitle && data.sectionTitle) sectionTitle.textContent = data.sectionTitle;
    if (introText && data.introText) introText.textContent = data.introText;
    if (aboutContent && data.content) {
        // Keep the intro paragraph, update the rest
        const existingIntro = aboutContent.querySelector('.about-intro');
        aboutContent.innerHTML = '';
        if (existingIntro) aboutContent.appendChild(existingIntro);
        aboutContent.innerHTML += blocksToHtml(data.content);
    }
    if (headshot && data.headshot) {
        headshot.src = urlFor(data.headshot);
        headshot.alt = data.headshotAlt || 'Headshot of Nicole';
    }
}

// Update Services Section
function updateServicesSection(services) {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card ${service.featured ? 'featured' : ''}">
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// Update FAQ Section
function updateFAQSection(faqs) {
    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer) return;
    
    faqContainer.innerHTML = faqs.map(faq => `
        <div class="faq-item">
            <button class="faq-question">
                ${faq.question}
                <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
                ${blocksToHtml(faq.answer)}
            </div>
        </div>
    `).join('');
    
    // Re-initialize FAQ functionality
    initializeFAQFunctionality();
}

// Update Resources Section
function updateResourcesSection(resourceCategories) {
    const resourcesGrid = document.querySelector('.resources-grid');
    if (!resourcesGrid) return;
    
    resourcesGrid.innerHTML = resourceCategories.map(category => `
        <div class="resource-category">
            <h3>${category.icon} ${category.title}</h3>
            <ul>
                ${category.resources.map(resource => `
                    <li>
                        ${resource.link ? `<a href="${resource.link}" target="_blank">${resource.title}</a>` : resource.title}
                        ${resource.description ? `<br><small>${resource.description}</small>` : ''}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// Inline SVG icons for social platforms
function getSocialIconSVG(platform) {
    const p = (platform || '').toLowerCase();
    if (p === 'facebook') {
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.49v-9.294H9.691V11.01h3.125V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.314h3.59l-.467 3.696h-3.123V24h6.127C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"></path></svg>';
    }
    if (p === 'instagram') {
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608C4.533 2.583 5.8 2.295 7.166 2.233 8.432 2.175 8.812 2.163 12 2.163zm0 1.837c-3.17 0-3.548.012-4.796.07-1.02.047-1.577.216-1.945.385-.49.213-.84.468-1.209.837-.369.369-.624.719-.837 1.209-.169.368-.338.925-.385 1.945-.058 1.248-.07 1.626-.07 4.796s.012 3.548.07 4.796c.047 1.02.216 1.577.385 1.945.213.49.468.84.837 1.209.369.369.719.624 1.209.837.368.169.925.338 1.945.385 1.248.058 1.626.07 4.796.07s3.548-.012 4.796-.07c1.02-.047 1.577-.216 1.945-.385.49-.213.84-.468 1.209-.837.369-.369.624-.719.837-1.209.169-.368.338-.925.385-1.945.058-1.248.07-1.626.07-4.796s-.012-3.548-.07-4.796c-.047-1.02-.216-1.577-.385-1.945-.213-.49-.468-.84-.837-1.209-.369-.369-.719-.624-1.209-.837-.368-.169-.925-.338-1.945-.385-1.248-.058-1.626-.07-4.796-.07zm0 3.838a5.162 5.162 0 1 1 0 10.324 5.162 5.162 0 0 1 0-10.324zm0 1.837a3.324 3.324 0 1 0 0 6.648 3.324 3.324 0 0 0 0-6.648zm4.906-3.205a1.2 1.2 0 1 1 0 2.399 1.2 1.2 0 0 1 0-2.4z"></path></svg>';
    }
    if (p === 'linkedin') {
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452H17.2v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.137 1.447-2.137 2.943v5.663h-3.245V9h3.116v1.561h.045c.434-.823 1.494-1.69 3.073-1.69 3.289 0 3.895 2.165 3.895 4.982v6.599zM5.337 7.433a1.882 1.882 0 1 1 0-3.764 1.882 1.882 0 0 1 0 3.764zM6.954 20.452H3.72V9h3.234v11.452z"></path></svg>';
    }
    if (p === 'twitter' || p === 'x') {
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.577 2.163-2.724-.949.564-2.005.974-3.127 1.196-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.932 2.208-4.932 4.932 0 .386.045.763.127 1.124-4.096-.205-7.73-2.169-10.164-5.153-.424.729-.666 1.577-.666 2.476 0 1.708.87 3.215 2.191 4.099-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.828-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.416-1.68 1.318-3.809 2.106-6.102 2.106-.395 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.22 7.557 2.22 9.054 0 14.009-7.496 14.009-13.986 0-.213 0-.425-.016-.637.961-.695 1.8-1.562 2.46-2.549z"></path></svg>';
    }
    return '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path></svg>';
}

// Update Contact Section
function updateContactSection(data) {
    const sectionTitle = document.querySelector('#contact .section-title');
    const sectionSubtitle = document.querySelector('#contact .section-subtitle');
    const consultationTitle = document.querySelector('.contact-info h3');
    const consultationDesc = document.querySelector('.contact-info p');
    
    if (sectionTitle && data.sectionTitle) sectionTitle.textContent = data.sectionTitle;
    if (sectionSubtitle && data.sectionSubtitle) sectionSubtitle.textContent = data.sectionSubtitle;
    if (consultationTitle && data.consultationTitle) consultationTitle.textContent = data.consultationTitle;
    if (consultationDesc && data.consultationDescription) consultationDesc.textContent = data.consultationDescription;
    
    // Update Calendly URL if provided
    if (data.calendlyUrl) {
        const calendlyWidget = document.querySelector('.calendly-widget');
        const calendlyLoading = document.querySelector('.calendly-loading');
        
        if (calendlyWidget) {
            // Update the data-url attribute
            calendlyWidget.setAttribute('data-url', data.calendlyUrl);
            
            // Load Calendly script if not already loaded
            if (!document.querySelector('script[src*="calendly.com"]')) {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://assets.calendly.com/assets/external/widget.js';
                script.onload = () => {
                    console.log('Calendly script loaded successfully');
                    // Hide loading message and show widget
                    if (calendlyLoading) calendlyLoading.style.display = 'none';
                    calendlyWidget.style.display = 'block';
                    
                    // Initialize Calendly widget after script loads
                    if (window.Calendly) {
                        window.Calendly.initInlineWidget({
                            url: data.calendlyUrl,
                            parentElement: calendlyWidget
                        });
                    }
                };
                document.head.appendChild(script);
            } else {
                // Script already loaded, just reinitialize
                if (window.Calendly) {
                    // Hide loading message and show widget
                    if (calendlyLoading) calendlyLoading.style.display = 'none';
                    calendlyWidget.style.display = 'block';
                    
                    // Clear existing widget content and reinitialize
                    calendlyWidget.innerHTML = '';
                    window.Calendly.initInlineWidget({
                        url: data.calendlyUrl,
                        parentElement: calendlyWidget
                    });
                }
            }
        }
    }
    
    // Update contact details
    const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
    const phoneLink = document.querySelector('.contact-item a[href^="tel:"]');
    const serviceAreaSpan = document.querySelector('.contact-item:first-child strong');
    
    if (emailLink && data.email) {
        emailLink.href = `mailto:${data.email}`;
        emailLink.textContent = data.email;
    }
    if (phoneLink && data.phone) {
        phoneLink.href = `tel:${data.phone}`;
        phoneLink.textContent = data.phone;
    }
    if (serviceAreaSpan && data.serviceArea) {
        serviceAreaSpan.nextSibling.textContent = ` ${data.serviceArea}`;
    }

    // Update social links from Sanity (preserve existing hardcoded SVG icons)
    const socialLinksContainer = document.querySelector('.social-links');
    if (socialLinksContainer && Array.isArray(data.socialLinks) && data.socialLinks.length > 0) {
        const anchors = socialLinksContainer.querySelectorAll('a.social-link');
        const anchorByPlatform = {};
        anchors.forEach(a => {
            ['facebook','instagram','linkedin','twitter','x'].forEach(p => {
                if (a.classList.contains(p)) anchorByPlatform[p] = a;
            });
        });

        data.socialLinks.forEach(item => {
            const platform = (item.platform || '').toLowerCase();
            const url = item.url || '#';
            const a = anchorByPlatform[platform];
            if (a) {
                a.href = url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            } else {
                // If a platform doesn't exist in markup, append with correct SVG
                const label = platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Social';
                const svg = getSocialIconSVG(platform);
                const newA = document.createElement('a');
                newA.className = `social-link ${platform}`;
                newA.href = url;
                newA.target = '_blank';
                newA.rel = 'noopener noreferrer';
                newA.setAttribute('aria-label', label);
                newA.innerHTML = svg;
                socialLinksContainer.appendChild(newA);
            }
        });
    }
}

// Update Site Settings
function updateSiteSettings(data) {
    // Update page title and meta
    if (data.seoTitle) document.title = data.seoTitle;
    if (data.seoDescription) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = data.seoDescription;
    }
    
    // Update logos
    const navLogo = document.querySelector('.nav-logo img');
    const footerLogo = document.querySelector('.footer-logo-img');
    
    if (navLogo && data.logo) navLogo.src = urlFor(data.logo);
    if (footerLogo && data.logo) footerLogo.src = urlFor(data.logo);
    
    // Update footer text
    const footerText = document.querySelector('.footer-text p:last-child');
    if (footerText && data.footerText) footerText.textContent = data.footerText;
}

// Load blog posts from Sanity
async function loadSanityBlogPosts() {
    console.log('Loading blog posts from Sanity...');
    try {
        const posts = await getBlogPosts();
        console.log('Sanity blog posts loaded:', posts);
        
        if (posts && posts.length > 0) {
            displaySanityBlogPosts(posts);
        } else {
            console.log('No blog posts found in Sanity, keeping default content');
        }
    } catch (error) {
        console.error('Error loading Sanity blog posts:', error);
        console.log('Falling back to JSON blog posts');
        loadBlogPosts(); // Fallback to existing JSON method
    }
}

// Display Sanity blog posts
function displaySanityBlogPosts(posts) {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;
    
    // Show only published posts, limit to 3 most recent
    const publishedPosts = posts.filter(post => post.publishedAt).slice(0, 3);
    
    blogGrid.innerHTML = publishedPosts.map(post => {
        const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
        });
        
        return `
            <div class="blog-card">
                <div class="blog-image-placeholder">
                    ${post.featuredImage ? `<img src="${urlFor(post.featuredImage)}" alt="${post.title}">` : 'Blog Post'}
                </div>
                <div class="blog-content">
                    <h3><a href="#" onclick="showSanityBlogPost('${post.slug.current}')" class="blog-title-link">${post.title}</a></h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-meta">
                        <span class="blog-date">${formattedDate}</span>
                        <span class="blog-category">${post.category}</span>
                    </div>
                    <a href="#" onclick="showSanityBlogPost('${post.slug.current}')" class="read-more-btn">Read More</a>
                </div>
            </div>
        `;
    }).join('');
}

// Re-initialize FAQ functionality after dynamic updates
function initializeFAQFunctionality() {
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
}

// ========== EXISTING BLOG FUNCTIONALITY (FALLBACK) ==========

// Blog functionality
async function loadBlogPosts() {
    console.log('Loading blog posts...');
    try {
        const response = await fetch('./blog-data.json');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blogData = await response.json();
        console.log('Blog data loaded:', blogData);
        
        const publishedPosts = blogData.posts.filter(post => post.published);
        console.log('Published posts:', publishedPosts);
        
        displayBlogPosts(publishedPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        console.log('Keeping default content due to error');
        // Keep the default "Coming Soon" content if loading fails
    }
}

function displayBlogPosts(posts) {
    console.log('Displaying blog posts:', posts);
    const blogGrid = document.querySelector('.blog-grid');
    
    if (!blogGrid) {
        console.error('Blog grid element not found!');
        return;
    }
    
    console.log('Blog grid element found:', blogGrid);
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display only the 3 most recent posts on the main page
    const recentPosts = posts.slice(0, 3);
    console.log('Recent posts to display:', recentPosts);
    
    blogGrid.innerHTML = recentPosts.map(post => {
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `
            <div class="blog-card">
                <div class="blog-image-placeholder">${post.featuredImage ? `<img src="${post.featuredImage}" alt="${post.title}">` : 'Blog Post'}</div>
                <div class="blog-content">
                    <h3><a href="#" onclick="showBlogPost('${post.id}')" class="blog-title-link">${post.title}</a></h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-meta">
                        <span class="blog-date">${formattedDate}</span>
                        <span class="blog-category">${post.category}</span>
                    </div>
                    <a href="#" onclick="showBlogPost('${post.id}')" class="read-more-btn">Read More</a>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('Blog grid updated successfully');
}

// Function to show a specific blog post
async function showBlogPost(postId) {
    try {
        const response = await fetch('./blog-data.json');
        const blogData = await response.json();
        const post = blogData.posts.find(p => p.id === postId && p.published);
        
        if (post) {
            // Update URL with post parameter
            const url = new URL(window.location);
            url.searchParams.set('post', postId);
            window.history.pushState({}, `${post.title} - Death Doula Nicole`, url);
            
            // Display the blog post
            displaySingleBlogPost(post);
        }
    } catch (error) {
        console.error('Error loading blog post:', error);
    }
}

async function checkForBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    
    if (postId) {
        try {
            // First try to find in Sanity blog posts
            const sanityPosts = await getBlogPosts();
            const sanityPost = sanityPosts.find(p => p.slug.current === postId && p.publishedAt);
            
            if (sanityPost) {
                displaySingleSanityBlogPost(sanityPost);
                return;
            }
            
            // If not found in Sanity, try JSON blog posts
            const response = await fetch('./blog-data.json');
            const blogData = await response.json();
            const jsonPost = blogData.posts.find(p => p.id === postId && p.published);
            
            if (jsonPost) {
                displaySingleBlogPost(jsonPost);
            }
        } catch (error) {
            console.error('Error loading blog post:', error);
        }
    }
}

function displaySingleBlogPost(post) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Hide all main page sections
    const sectionsToHide = ['hero', 'about', 'services', 'blog', 'resources', 'faq', 'contact'];
    sectionsToHide.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // Create or update blog post container
    let blogPostContainer = document.getElementById('blog-post-container');
    if (!blogPostContainer) {
        blogPostContainer = document.createElement('div');
        blogPostContainer.id = 'blog-post-container';
        
        // Insert after the navigation
        const navbar = document.querySelector('.navbar');
        if (navbar && navbar.nextSibling) {
            navbar.parentNode.insertBefore(blogPostContainer, navbar.nextSibling);
        } else {
            document.body.appendChild(blogPostContainer);
        }
    }
    
    blogPostContainer.style.display = 'block';
    blogPostContainer.innerHTML = `
        <article class="blog-post-single">
            <div class="container">
                <div class="blog-post-header">
                    <nav class="breadcrumb">
                        <a href="#" onclick="showHomePage()" class="back-home-btn">&larr; Back to Home</a>
                    </nav>
                    <h1 class="blog-post-title">${post.title}</h1>
                    <div class="blog-post-meta">
                        <span class="blog-post-date">${formattedDate}</span>
                        <span class="blog-post-author">by ${post.author}</span>
                        <span class="blog-post-category">${post.category}</span>
                    </div>
                </div>
                ${post.featuredImage ? `<img src="${post.featuredImage}" alt="${post.title}" class="blog-post-featured-image">` : ''}
                <div class="blog-post-content">
                    ${formatBlogContent(post.content)}
                </div>
                <div class="blog-post-footer">
                    <a href="#" onclick="showHomePage()" class="btn-primary">Back to Home</a>
                    <a href="#" onclick="showHomePage(); setTimeout(() => { document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); }, 100);" class="btn-secondary">Get in Touch</a>
                </div>
            </div>
        </article>
    `;
    
    // Update page title
    document.title = `${post.title} - Death Doula Nicole`;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to show the home page and hide blog post
function showHomePage() {
    // Hide blog post container
    const blogPostContainer = document.getElementById('blog-post-container');
    if (blogPostContainer) {
        blogPostContainer.style.display = 'none';
    }
    
    // Show all main page sections
    const sectionsToShow = ['hero', 'about', 'services', 'blog', 'resources', 'faq', 'contact'];
    sectionsToShow.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    });
    
    // Update page title
    document.title = 'Death Doula Nicole - Compassionate End-of-Life Support | Northeast Ohio';
    
    // Clear URL parameters
    const url = new URL(window.location);
    url.searchParams.delete('post');
    window.history.replaceState({}, document.title, url);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatBlogContent(content) {
    // Simple markdown-like formatting
    return content
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/## (.*?)(?=<br>|<\/p>)/g, '<h2>$1</h2>')
        .replace(/# (.*?)(?=<br>|<\/p>)/g, '<h1>$1</h1>')
        .replace(/- (.*?)(?=<br>|<\/p>)/g, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
        .replace(/<\/ul><br><ul>/g, '');
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
    const inputs = document.querySelectorAll('input, textarea');
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
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <p style="background-color: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            ✓ Thank you for your message! I'll get back to you soon.
        </p>
    `;
    
    const form = document.querySelector('.contact-form');
    form.insertBefore(successMsg, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

function showFormSubmissionSuccess() {
    const existingMsg = document.querySelector('.submission-success-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const successMsg = document.createElement('div');
    successMsg.className = 'submission-success-message';
    successMsg.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; text-align: center; border: 2px solid #c3e6cb;">
            <h4 style="margin: 0 0 0.5rem 0; color: #155724;">✓ Message Sent Successfully!</h4>
            <p style="margin: 0;">Thank you for reaching out. I've received your message and will get back to you within 24 hours. You should also receive an auto-reply confirmation email shortly.</p>
        </div>
    `;
    
    const contactSection = document.querySelector('#contact .container');
    contactSection.insertBefore(successMsg, contactSection.firstChild);
    
    // Remove success message after 10 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 10000);
}

// Function to show a specific Sanity blog post
async function showSanityBlogPost(postSlug) {
    try {
        const posts = await getBlogPosts();
        const post = posts.find(p => p.slug.current === postSlug && p.publishedAt);
        
        if (post) {
            // Update URL with post parameter
            const url = new URL(window.location);
            url.searchParams.set('post', postSlug);
            window.history.pushState({}, `${post.title} - Death Doula Nicole`, url);
            
            // Display the blog post
            displaySingleSanityBlogPost(post);
        }
    } catch (error) {
        console.error('Error loading Sanity blog post:', error);
    }
}

// Display single Sanity blog post
function displaySingleSanityBlogPost(post) {
    const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Hide all main page sections
    const sectionsToHide = ['hero', 'about', 'services', 'blog', 'resources', 'faq', 'contact'];
    sectionsToHide.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // Create or update blog post container
    let blogPostContainer = document.getElementById('blog-post-container');
    if (!blogPostContainer) {
        blogPostContainer = document.createElement('div');
        blogPostContainer.id = 'blog-post-container';
        
        // Insert after the navigation
        const navbar = document.querySelector('.navbar');
        if (navbar && navbar.nextSibling) {
            navbar.parentNode.insertBefore(blogPostContainer, navbar.nextSibling);
        } else {
            document.body.appendChild(blogPostContainer);
        }
    }
    
    blogPostContainer.style.display = 'block';
    blogPostContainer.innerHTML = `
        <article class="blog-post-single">
            <div class="container">
                <div class="blog-post-header">
                    <nav class="breadcrumb">
                        <a href="#" onclick="showHomePage()" class="back-home-btn">&larr; Back to Home</a>
                    </nav>
                    <h1 class="blog-post-title">${post.title}</h1>
                    <div class="blog-post-meta">
                        <span class="blog-post-date">${formattedDate}</span>
                        <span class="blog-post-author">by ${post.author || 'Nicole'}</span>
                        <span class="blog-post-category">${post.category || 'Reflections'}</span>
                    </div>
                </div>
                ${post.featuredImage ? `<img src="${urlFor(post.featuredImage)}" alt="${post.title}" class="blog-post-featured-image">` : ''}
                <div class="blog-post-content">
                    ${blocksToHtml(post.content)}
                </div>
                <div class="blog-post-footer">
                    <a href="#" onclick="showHomePage()" class="btn-primary">Back to Home</a>
                    <a href="#" onclick="showHomePage(); setTimeout(() => { document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); }, 100);" class="btn-secondary">Get in Touch</a>
                </div>
            </div>
        </article>
    `;
    
    // Update page title
    document.title = `${post.title} - Death Doula Nicole`;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}