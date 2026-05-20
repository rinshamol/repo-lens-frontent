# RepoLens — Frontend

AI-powered GitHub repository analyzer. Paste any public GitHub repo URL and get instant insights into code quality, tech stack, security risks, and improvement suggestions — powered by a Spring Boot backend and OpenRouter AI.

🔗 **Live Demo:** [repo-lens-frontent.vercel.app](https://repo-lens-frontent.vercel.app)  
🔗 **Backend Repo:** [github.com/rinshamol/repolens-backend](https://github.com/rinshamol/repolens-backend)

---

## ✨ Features

- 🔍 Analyze any public GitHub repository by URL
- 🔐 GitHub OAuth login to analyze private repositories
- 📊 Detailed AI analysis including:
  - Project status and completion percentage
  - Summary and strengths
  - Tech stack with versions (languages, frameworks, libraries)
  - Code quality rating and best practices
  - Risk assessment and vulnerabilities
  - Actionable improvement suggestions with effort estimates
  - Suggested package updates with breaking change warnings
- 🌙 Dark / Light mode toggle
- ⚡ Real-time loading progress indicator

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| React 18 | UI components and state management |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| Axios | HTTP client for API calls |
| Lucide React | Icons |
| Vercel | Deployment and hosting |

---

## 📁 Project Structure

```
repo-lens-frontent/
├── src/
│   ├── components/
│   │   ├── Analyzer/        # Repository input and loading screen
│   │   ├── Error/           # Error boundary and error messages
│   │   ├── Layout/          # Header and navigation
│   │   └── Results/         # Analysis result display components
│   ├── pages/
│   │   └── AboutPage.tsx
│   ├── services/
│   │   └── api.ts           # Axios API client and service functions
│   ├── types/
│   │   └── analysis.ts      # TypeScript type definitions
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
└── vite.config.ts
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- RepoLens backend running locally or deployed

### Installation

```bash
# Clone the repository
git clone https://github.com/rinshamol/repo-lens-frontent.git
cd repo-lens-frontent

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080
VITE_REDIRECT_URI=http://localhost:5173
VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment

Deployed on **Vercel** with automatic CI/CD — every push to `main` triggers a new deployment.

### Vercel Environment Variables

| Key | Value |
|---|---|
| `VITE_API_URL` | Your deployed backend URL |
| `VITE_REDIRECT_URI` | Your Vercel frontend URL |
| `VITE_GITHUB_CLIENT_ID` | Your GitHub OAuth App Client ID |

---

## 🔐 GitHub OAuth Flow
 
This is the actual OAuth2 flow verified from the network tab:
 
```
1. authorize      → 302   Frontend redirects user to GitHub login
2. token?code=... → 302   GitHub redirects to backend with auth code
                           Backend exchanges code for access token
                           Backend redirects to frontend with ?token=
3. ?token=gho_... → 200   Frontend receives and stores the access token
4. user           → 200   Frontend fetches GitHub user info
```
 
The key insight: GitHub redirects directly to the **backend** (not the frontend) with the auth code. The backend exchanges it securely using the client secret, then redirects to the frontend with the final access token. This keeps the client secret off the browser entirely.
 


---

## 🎯 What I Learned

- Building a full-stack app with React + Spring Boot
- Implementing GitHub OAuth2 flow across frontend and backend
- Managing environment variables securely in production
- Deploying a React/Vite app on Vercel with CI/CD
- Handling API errors gracefully with typed error boundaries
- Connecting a frontend to a backend deployed on a different domain (CORS)

---

> Made with 💙 by [Rinshamol](https://github.com/rinshamol)
