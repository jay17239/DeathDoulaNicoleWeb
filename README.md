# Death Doula Nicole Website

A beautiful, compassionate website for professional death doula services in Northeast Ohio.

## 🌟 About

This website provides information about Nicole's death doula services, offering gentle guidance and support during end-of-life transitions. The design emphasizes warmth, peace, and professionalism, reflecting the sensitive nature of death doula work.

## 🎨 Design Features

- **Warm Color Palette**: Primary brown (#7A4C2B), cream, and soft neutrals
- **Elegant Typography**: Playfair Display for headings, Source Sans Pro for body text
- **Gentle Animations**: Floating butterfly SVG and smooth transitions
- **Responsive Design**: Mobile-first approach with clean, spacious layouts
- **Accessibility**: WCAG-compliant color contrast, keyboard navigation, screen reader support

## 📱 Sections

- **Hero**: Compelling introduction with call-to-action
- **About**: Personal story and approach to death doula work
- **Services**: Six core service offerings with descriptions
- **Blog**: Platform for sharing insights and resources (placeholder structure)
- **Resources**: Helpful materials organized by category
- **FAQ**: Common questions about death doula services
- **Contact**: Contact form and Calendly integration for scheduling

## 🛠️ Technical Features

- Static HTML/CSS/JavaScript website
- No build process required
- Optimized for Vercel deployment
- Mobile hamburger menu
- Interactive FAQ accordion
- Form validation
- Smooth scrolling navigation
- Intersection Observer animations

## 🚀 Deployment

### Quick Deploy to Vercel

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Local Development

```bash
# Clone the repository
git clone https://github.com/jay17239/DeathDoulaNicoleWeb.git

# Navigate to project directory
cd DeathDoulaNicoleWeb

# Serve locally (choose one option)
python -m http.server 3000
# or
python3 -m http.server 3000
# or
npx serve .
```

Visit `http://localhost:3000` to view the website.

## 📂 Project Structure

```
death-doula-nicole-website/
├── index.html              # Main website file
├── styles.css             # Complete styling system
├── script.js              # Interactive functionality
├── DeathDoulaNicole.png   # Logo image
├── package.json           # Project metadata
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
└── tasks/                # Project planning
    ├── prd-death-doula-website.md
    └── tasks-prd-death-doula-website.md
```

## 🎯 Key Features

### Navigation
- Fixed header with smooth scroll links
- Mobile-responsive hamburger menu
- Logo integration

### Interactive Elements
- FAQ accordion with rotating icons
- Contact form with validation
- Scroll-triggered animations
- Hover effects on cards and buttons

### Accessibility
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- High color contrast ratios
- Focus indicators

### SEO Optimization
- Meta tags for search engines
- Open Graph tags for social sharing
- Twitter Card support
- Semantic HTML structure
- Fast loading performance

## 🔧 Customization

### Colors
Primary colors are defined as CSS custom properties in `styles.css`:
```css
:root {
    --primary-brown: #7A4C2B;
    --light-brown: #A0724F;
    --cream: #F5F1E8;
    --warm-white: #FEFBF6;
    /* ... */
}
```

### Content
All content can be easily updated by editing `index.html`. Key sections include:
- Hero title and subtitle
- About section text
- Service descriptions
- FAQ questions and answers
- Contact information

### Integrations
- **Calendly**: Update the link in the contact section
- **Social Media**: Add real Facebook and Instagram URLs
- **Contact Form**: Configure with Vercel Forms or preferred service
- **Analytics**: Add Google Analytics or preferred tracking

## 📞 Support

For questions about this website implementation, please create an issue in the GitHub repository.

## 📄 License

MIT License - see project for details.

---

*Created with compassion for Nicole's death doula practice in Northeast Ohio.* 