<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Makanin Labs - AI Marketing Solutions

AI-powered marketing support with an interactive AI strategy generator.

View your app in AI Studio: https://ai.studio/apps/drive/17eKJzhXyxzEBzJbf-YwhQQ2jXAr0qoJ_

## Features

- 🎨 Modern, minimalist landing page design
- 🤖 Interactive AI strategy generator powered by Gemini API
- 🌐 Bilingual support (Japanese/English)
- ⚡ Built with React, TypeScript, and Vite

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **Gemini API Key** - Get yours at [Google AI Studio](https://aistudio.google.com/app/apikey)

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

3. **Configure environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
makaninlabs/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── AIStrategyGenerator.tsx
├── services/           # API services
│   └── geminiService.ts
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
- **Google Gemini API** - AI-powered content generation

## Troubleshooting

### API Key Issues

If you encounter errors related to the API key:
- Ensure your `.env.local` file exists and contains a valid `GEMINI_API_KEY`
- Verify your API key is active at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Restart the development server after changing environment variables

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
