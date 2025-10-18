# Robot Banao Bangladesh - Robotics E-Commerce Shop

A modern, sci-fi themed e-commerce website for selling preprogrammed robots in Bangladesh.

## 🚀 Features

- **Dark Sci-Fi Theme**: Sleek, modern design with animations and gradients
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **Shopping Cart**: Full cart functionality with local storage
- **Order Management**: Complete checkout process with customer information
- **Netlify Functions**: Serverless backend for order processing
- **Zero Cost**: Completely free to host on Netlify

## 🤖 Products

- Line Following Robot (LFR)
- Obstacle Avoiding Car
- Robo Soccer Car
- Robo Race Car
- QuadCopter Drone
- RC Boat

## 💳 Payment

Orders are prepaid via bKash. After placing an order, we will contact you to arrange payment.

## 🛠️ Setup & Deployment

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server** (with Netlify Functions):
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:8888
   ```

### Deploy to Netlify

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings are auto-detected from `netlify.toml`
   - Click "Deploy site"

3. **Your site is live!** 🎉

## 📁 Project Structure

```
Robotics/
├── index.html              # Main HTML file
├── styles.css              # All styles
├── script.js               # JavaScript functionality
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies
└── netlify/
    └── functions/
        └── submit-order.js # Order processing function
```

## 🎨 Customization

### Change Products

Edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: 'Your Robot Name',
        description: 'Description here',
        price: 5000,
        emoji: '🤖',
        badge: 'New',
        features: ['Feature 1', 'Feature 2']
    }
];
```

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00f0ff;
    --secondary-color: #7b2cbf;
    --accent-color: #ff006e;
    /* ... more colors */
}
```

### Update Contact Information

Edit the contact section in `index.html`:

```html
<div class="contact-card">
    <div class="contact-icon">📱</div>
    <h3>Phone</h3>
    <p>+880 1XXX-XXXXXX</p>
</div>
```

## 📧 Order Notifications (Optional)

To receive email notifications when orders are placed:

1. **Sign up for SendGrid** (free tier available)
2. **Get API key**
3. **Install SendGrid package**:
   ```bash
   npm install @sendgrid/mail
   ```

4. **Update `netlify/functions/submit-order.js`**:
   ```javascript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   // Add email sending code
   ```

5. **Add environment variable** in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add `SENDGRID_API_KEY`

## 🗄️ Database Integration (Optional)

To save orders to a database:

### Option 1: Airtable (Free & Easy)
1. Create an Airtable base
2. Install `airtable` package
3. Update the function to save to Airtable

### Option 2: Firebase
1. Create a Firebase project
2. Install `firebase-admin`
3. Update function to save to Firestore

### Option 3: Google Sheets
1. Use Google Sheets API
2. Install `googleapis`
3. Save orders to a spreadsheet

## 📱 Features Breakdown

### Hero Section
- Animated particles background
- Grid overlay effect
- Smooth scroll indicator
- Statistics display

### Products
- Grid layout with glassmorphism cards
- Hover animations
- Feature tags
- Add to cart functionality

### Shopping Cart
- Modal interface
- Quantity controls
- Remove items
- Local storage persistence
- Real-time total calculation

### Checkout
- Complete customer information form
- Address fields
- Order summary
- bKash payment notice
- Form validation

### Success Modal
- Animated checkmark
- Order ID generation
- Confirmation message

## 🎯 Performance

- Minimal JavaScript (vanilla JS, no frameworks)
- Optimized CSS animations
- Fast loading times
- Mobile-optimized

## 🔒 Security

- HTTPS by default (Netlify)
- Form validation
- Serverless functions for backend
- No sensitive data stored client-side

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or support, contact us at:
- Email: info@Robot Banaobd.com
- Phone: +880 1XXX-XXXXXX

---

Built with ⚡ by Robot Banao Bangladesh
