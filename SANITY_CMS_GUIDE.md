# Sanity CMS Integration Guide 🎨

Welcome! Your website now has a Content Management System (CMS) that allows you to edit all the content without touching any code. Here's how to use it:

## 🚀 Quick Start

### 1. Access Your Sanity Studio
The Sanity Studio is your content editing dashboard. There are two ways to access it:

**Option A: Local Development**
```bash
cd schm
npm run dev
```
Then open: http://localhost:3333

**Option B: Online Studio** (once deployed)
Visit: https://deathdoulanicole.sanity.studio

### 2. First Time Setup
Run this command once to populate your CMS with current website content:
```bash
node initialize-sanity-data.js
```

## 📝 What You Can Edit

### 🏠 Hero Section
- Main headline and subtitle
- Button text and links
- Hero image

### 👩‍⚕️ About Section  
- Section title
- Introduction paragraph
- Main content (rich text)
- Professional headshot photo

### 🛠️ Services
- Add/remove/reorder services
- Service titles and descriptions
- Service icons (emojis)
- Mark services as featured

### ❓ FAQ Section
- Add/edit/remove questions and answers
- Organize FAQs by category
- Control display order

### 📚 Resources
- Create resource categories
- Add resources with links
- Organize by category with icons

### 📞 Contact Information
- Contact details (email, phone, service area)
- Section titles and descriptions
- Calendly integration
- Social media links

### ⚙️ Site Settings
- Site name and tagline
- SEO settings (title, description)
- Logo and favicon
- Footer text
- Navigation menu

### 📰 Blog Posts
- Create/edit blog posts
- Add featured images
- Rich text content
- Publish/unpublish posts
- Categories and excerpts

## 🎯 How to Make Changes

### Adding New Content
1. Open Sanity Studio
2. Click the "+" button or "Create" 
3. Choose the content type (Service, FAQ, Blog Post, etc.)
4. Fill in the fields
5. Click "Publish"

### Editing Existing Content
1. Find the content in the left sidebar
2. Click on it to open the editor
3. Make your changes
4. Click "Publish" to save

### Managing Images
1. Click the image field in any document
2. Upload new images or select from library
3. Add alt text for accessibility
4. Save/publish

### Reordering Items
- Services and FAQs have an "Order" field
- Set numbers (1, 2, 3, etc.) to control display order
- Lower numbers appear first

## 🔄 How Changes Appear on Website

1. **Make changes** in Sanity Studio
2. **Publish** your changes
3. **Refresh** your website to see updates
4. Changes appear **immediately** (no waiting!)

## 💡 Pro Tips

### Content Writing
- Keep headlines clear and compelling
- Use bullet points for easy reading
- Write in a warm, compassionate tone
- Include keywords naturally for SEO

### Images
- Use high-quality photos (minimum 1200px wide)
- Keep file sizes reasonable (under 2MB)
- Always add descriptive alt text
- Professional photos work best

### SEO Optimization
- Update page titles and descriptions
- Use relevant keywords naturally
- Keep meta descriptions under 160 characters
- Update headings to be descriptive

### Blog Posts
- Use engaging headlines
- Include featured images
- Break up text with headings
- Add relevant categories
- Write compelling excerpts

## 🆘 Common Tasks

### Changing Contact Information
1. Go to "Contact Information" in Sanity
2. Update email, phone, or service area
3. Publish changes

### Updating Your Calendly Link
1. Go to "Contact Information" in Sanity
2. Find the "Calendly URL" field
3. Enter your complete Calendly scheduling link (e.g., "https://calendly.com/your-username/consultation")
4. Publish changes
5. The Calendly widget on your website will automatically update with your new link

### Adding a New Service
1. Click "Create" → "Service"
2. Add title, description, and icon
3. Set order number
4. Mark as featured if desired
5. Publish

### Writing a Blog Post
1. Click "Create" → "Blog Post" 
2. Add title and excerpt
3. Upload featured image
4. Write content using the rich text editor
5. Set publish date
6. Add category
7. Publish when ready

### Updating the Hero Section
1. Go to "Hero Section" (should only be one)
2. Edit title, subtitle, or buttons
3. Replace hero image if needed
4. Publish

## 🔒 User Management

To give others access:
1. Go to https://manage.sanity.io
2. Select your project
3. Go to "Members"
4. Invite users by email
5. Set their role (Admin, Editor, etc.)

## 📞 Support

If you need help:
1. Check this guide first
2. Try the Sanity documentation: https://sanity.io/docs
3. Contact your developer for technical issues

## 🎉 You're All Set!

Your website is now fully editable through Sanity CMS. No more asking for code changes - you have complete control over your content. Happy editing! ✨ 