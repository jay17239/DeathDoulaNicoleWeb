// Death Doula Nicole Website - Interactive Functionality with Sanity CMS Integration

// Import Vercel Analytics
import { analytics } from '@vercel/analytics';

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
    blocksToHtml
} from './sanity-client.js';

// Initialize Vercel Analytics
analytics();

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
        const [heroData, aboutData, services, faqs, resourceCategories, contactData, siteSettings] = await Promise.all([
            getHeroData(),
            getAboutData(), 
            getServices(),
            getFAQs(),
            getResourceCategories(),
            getContactData(),
            getSiteSettings()
        ]);
        
        console.log('Sanity data loaded:', { heroData, aboutData, services, faqs, resourceCategories, contactData, siteSettings });
        
        // Update each section
        if (heroData) updateHeroSection(heroData);
        if (aboutData) updateAboutSection(aboutData);
        if (services && services.length > 0) updateServicesSection(services);
        if (faqs && faqs.length > 0) updateFAQSection(faqs);
        if (resourceCategories && resourceCategories.length > 0) updateResourcesSection(resourceCategories);
        if (contactData) updateContactSection(contactData);
        if (siteSettings) updateSiteSettings(siteSettings);
        
    } catch (error) {
        console.error('Error loading Sanity content:', error);
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