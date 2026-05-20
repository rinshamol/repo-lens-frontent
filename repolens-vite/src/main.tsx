import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { exchangeToken } from './services/api';

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI ?? 'http://localhost:5173/callback';

async function bootstrap() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  console.log('Code from URL:', code);
  console.log('Existing token:', localStorage.getItem('gh_token'));

  if (code && !localStorage.getItem('gh_token')) {
    try {
      const result = await exchangeToken(code, REDIRECT_URI);
      console.log('Exchange result:', result);
      if (result.access_token) {
        localStorage.setItem('gh_token', result.access_token);
        console.log('Token saved!');
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