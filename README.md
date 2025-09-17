<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Stake Engine Guidelines Checker

A comprehensive tool for game developers to ensure their games comply with Stake Engine submission guidelines before submitting. This checker helps developers verify that their games meet all technical, content, and asset requirements.

## 🚀 Live Demo

**Access the live application:** [https://jmenichole.github.io/Stake-Engine-Guidelines-Checker/](https://jmenichole.github.io/Stake-Engine-Guidelines-Checker/)

## Features

- **📋 Interactive Checklist**: Track progress through all submission requirements
- **🤖 AI-Powered Analysis**: Upload your game files for automated compliance analysis
- **📐 Asset Previewer**: Validate your game assets meet specifications  
- **🔍 Term Checker**: Scan for prohibited terms and get suggestions

## 🛠️ Development

**Prerequisites:** Node.js

### Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jmenichole/Stake-Engine-Guidelines-Checker.git
   cd Stake-Engine-Guidelines-Checker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment (optional for AI features):**
   - Create a `.env.local` file
   - Add your Gemini API key: `GEMINI_API_KEY=your_api_key_here`

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Visit:** `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🚀 Deployment

This application is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment uses GitHub Actions to:

1. Build the application with Vite
2. Deploy the built assets to GitHub Pages
3. Make the application available at the live demo URL

### Manual Deployment

To trigger a manual deployment, go to the Actions tab in GitHub and run the "Deploy to GitHub Pages" workflow.

## 📁 Project Structure

```
├── components/          # React components
├── constants/          # Guidelines data and constants
├── pages/             # Main application pages
├── services/          # API services (Gemini AI)
├── types.ts           # TypeScript definitions
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```
