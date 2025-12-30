# Yash Wankhade - Interactive Portfolio Website

A modern, responsive portfolio website showcasing skills, projects, and experience.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Smooth scrolling, animations, and hover effects
- **Modern UI**: Clean and professional design with gradient backgrounds
- **Contact Form**: Functional contact form with email sending capability
- **Typing Effect**: Dynamic typing animation in the hero section
- **Scroll Animations**: Elements fade in as you scroll
- **Mobile Menu**: Hamburger menu for mobile navigation
- **Theme Toggle**: Light and dark mode support

## Backend Setup for Contact Form

Your portfolio now includes a custom backend server for handling contact form submissions. This gives you full control and sends emails directly to your inbox.

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Gmail account (for sending emails)

### Backend Setup Steps

#### Step 1: Install Dependencies
```bash
cd backend
npm install
```

#### Step 2: Configure Environment Variables
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your actual values:
```env
PORT=3001
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

#### Step 3: Set Up Gmail App Password
1. Enable 2-factor authentication on your Google account
2. Go to [Google App Passwords](https://support.google.com/accounts/answer/185833)
3. Generate an "App Password" for "Mail"
4. Use this App Password as `EMAIL_PASS` in your `.env` file

#### Step 4: Start the Backend Server
```bash
# For development (with auto-restart)
npm run dev

# For production
npm start
```

The server will run on `http://localhost:3001`

### Testing the Contact Form

1. **Start the backend server** (as shown above)
2. **Open your portfolio website** in a browser
3. **Fill out the contact form** and submit it
4. **Check your email** - you should receive the message
5. **Check server logs** for confirmation

### Deployment Options

#### Option 1: Local Development
- Run the backend on your local machine
- Access your portfolio at `http://localhost:3001` (frontend) and `http://localhost:3001` (backend)

#### Option 2: Deploy Backend Separately
- Deploy the backend to services like Heroku, Railway, or Vercel
- Update the API URL in `js/script.js` to point to your deployed backend
- Example: `https://your-backend-url.com/api/contact`

#### Option 3: Full-Stack Deployment
- Deploy both frontend and backend together
- Use services like Railway, Render, or Vercel for full-stack apps

### Security Features
- ✅ **Rate Limiting**: 5 submissions per hour per IP
- ✅ **Input Validation**: Server-side validation for all fields
- ✅ **CORS Protection**: Configured for your domain
- ✅ **Error Handling**: Proper error responses and logging

### Troubleshooting

**"Failed to send email" error:**
- Check your Gmail credentials in `.env`
- Ensure you're using an App Password, not your regular password
- Verify 2FA is enabled on your Google account

**"Connection refused" error:**
- Make sure the backend server is running
- Check that the API URL in `js/script.js` is correct
- Verify the port (3001) is not blocked

**Emails not received:**
- Check your spam/junk folder
- Verify the recipient email in `.env`
- Check server logs for any email sending errors

## Formspree Alternative (Simpler Setup)

## Structure

```
yash-portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── script.js       # JavaScript for interactivity
└── images/             # Image assets (add your photos here)
    ├── profile.jpg     # Profile picture for hero section
    ├── about.jpg       # About section image
    ├── project1.jpg    # Project showcase images
    ├── project2.jpg
    └── project3.jpg
```

## Setup Instructions

1. **Add Images**: Replace the placeholder image files in the `images/` folder with your actual photos:
   - `profile.jpg`: Your professional headshot (300x300px recommended)
   - `about.jpg`: An image representing your work or personality
   - `project1.jpg`, `project2.jpg`, `project3.jpg`: Screenshots of your projects

2. **Customize Content**: Edit the `index.html` file to update:
   - Personal information (name, contact details, bio)
   - Skills and technologies
   - Work experience
   - Project details and links
   - Education information

3. **Update Links**: Replace placeholder links with your actual:
   - Social media profiles
   - Project live demos and GitHub repositories
   - Email address

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Poppins)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

You can deploy this website to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## Customization

### Colors
The primary color is defined as CSS custom property `--primary-color` in the `:root` selector. Change this to match your brand.

### Fonts
The website uses Google Fonts. You can change the font family in the CSS.

### Animations
All animations are CSS-based for better performance. You can adjust timing and effects in the `styles.css` file.

## Contact

Feel free to reach out for any questions or customization requests!