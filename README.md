# Valentine's Website - Baguio Proposal 💕

An interactive Valentine's Day proposal website featuring a fun journey through screens with animations, moving buttons, and a sweet Baguio trip proposal.

## Features

- **Screen 1: Welcome/Teaser** - Animated welcome with an impossible-to-click exit button
- **Screen 2: Fake Loading** - Fun loading screen with romantic messages
- **Screen 3: Baguio Proposal** - Beautiful showcase of Baguio activities and locations
- **Screen 4: The Big Question** - Valentine's proposal with a jeepney "NO" button that runs away
- **Screen 5: Celebration** - Confetti, hearts, and celebration when they say YES!

## Setup Instructions

### Option 1: Open Locally (Simplest)

1. Simply double-click `index.html` to open it in your browser
2. That's it! The website will work locally

### Option 2: Use a Local Server (Recommended for full functionality)

If you want to ensure all features work perfectly:

1. **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Then open: http://localhost:8000
   ```

2. **Using Node.js (if you have it installed):**
   ```bash
   npx serve
   ```

3. **Using VS Code:**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

## Customization

### Change Images

Replace the image URLs in `index.html` with your own:
- Screen 1: Welcome GIF (line ~24)
- Screen 3: Baguio location images (lines ~77-102)
- Screen 4: Question GIF (line ~116)

### Customize Text

Edit text in `index.html`:
- Welcome message (line ~25)
- Loading messages in `script.js` (lines ~48-55)
- Baguio descriptions (throughout Screen 3)
- Success messages (Screen 5)

### Change Colors

Modify colors in `style.css`:
- Background gradient (line ~9)
- Button colors (various locations)
- Card colors (line ~228)

## Deployment Options

### Deploy to GitHub Pages (Free)

1. Create a new GitHub repository
2. Upload these files to the repository
3. Go to Settings > Pages
4. Select "main" branch as source
5. Your site will be live at: `https://yourusername.github.io/repository-name`

### Deploy to Netlify (Free, Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this folder into Netlify
3. Get instant URL to share!

### Deploy to Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Import this folder
3. Deploy with one click

## Mobile Compatibility

The website is fully responsive and works on:
- Desktop browsers
- Mobile phones (iOS & Android)
- Tablets

## Sound Notes

- Sound effects may require user interaction to play (browser security)
- Some browsers block autoplay audio
- This is normal behavior and doesn't affect the core experience

## Tips for Best Experience

1. **Test before sharing**: Open the website and go through all screens
2. **Mobile-first**: Most people will view this on their phones
3. **Use incognito mode**: Test how it looks fresh without caching
4. **Share the link**: Once deployed, send the link directly to your special someone

## Technical Stack

- HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript (no frameworks needed)
- Canvas Confetti library (for celebration effects)

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## File Structure

```
heart/
├── index.html          # Main HTML file with all screens
├── style.css           # All styles and animations
├── script.js           # Interactive functionality
└── README.md          # This file
```

## Troubleshooting

**Exit button not moving?**
- Make sure JavaScript is enabled
- Try refreshing the page

**No sound effects?**
- This is normal on some browsers
- User must interact with page first (click/tap)

**Images not loading?**
- Check your internet connection
- Images are loaded from external sources (Unsplash/Giphy)

## Credits

- Images: Unsplash & Giphy
- Confetti: canvas-confetti library
- Design: Based on Valentine's Website Plan

## License

Feel free to use and modify for your personal Valentine's proposal!

---

Made with 💕 for your special someone

Good luck! 🚀
