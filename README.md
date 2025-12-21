<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Makanin Labs - AI Marketing Solutions

AI-powered marketing support with an interactive AI strategy generator.

View your app in AI Studio: https://ai.studio/apps/drive/17eKJzhXyxzEBzJbf-YwhQQ2jXAr0qoJ_

## Features

- 🎨 Modern, minimalist landing page design
- 🌐 Bilingual support (Japanese/English)
- ⚡ Built with React, TypeScript, and Vite

## Prerequisites

- **Node.js** (v18 or higher recommended)

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kkitase/makaninlabs.git
   cd makaninlabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Deployment

This application is deployed on **Firebase Hosting**.

### Production URL

🌐 **Live Site**: https://makaninlabs.com

> **Note**: Also accessible via https://block-drop-le7hp.web.app

### Deploy to Firebase Hosting

1. **Install Firebase CLI** (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Build the production bundle**
   ```bash
   npm run build
   ```

4. **Deploy to Firebase Hosting**
   ```bash
   firebase deploy --only hosting
   ```

> **Note**: Make sure you have the necessary permissions for the Firebase project `block-drop-le7hp`.


## Project Structure

```
makaninlabs/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
├── index.html         # HTML template
├── index.css          # Global styles
└── vite.config.ts     # Vite configuration
```

## Technologies Used

- **React** 19.2.3 - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework (via CDN)

## Troubleshooting

### Build Errors

If you encounter TypeScript or dependency errors:
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

If port 3000 is already in use, you can specify a different port:
```bash
npm run dev -- --port 3001
```

## License

See [LICENSE](LICENSE) file for details.

## Support

For issues or questions, please open an issue on GitHub.
