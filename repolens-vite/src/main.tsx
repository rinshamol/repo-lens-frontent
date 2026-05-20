import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { exchangeToken } from './services/api';

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI ?? 'http://localhost:5173/callback';

async function bootstrap() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const token = params.get('token'); // ← new

  // Handle direct token from backend redirect
  if (token) {
    localStorage.setItem('gh_token', token);
    window.history.replaceState({}, '', '/');
  }
  // Handle code exchange (old flow - can remove later)
  else if (code && !localStorage.getItem('gh_token')) {
    try {
      const result = await exchangeToken(code, REDIRECT_URI);
      if (result.access_token) {
        localStorage.setItem('gh_token', result.access_token);
      }
    } catch (e) {
      console.error('Token exchange failed', e);
    }
    window.history.replaceState({}, '', '/');
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
  );
}
bootstrap();