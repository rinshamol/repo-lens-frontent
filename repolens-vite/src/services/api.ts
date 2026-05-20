// src/services/api.ts
import axios from 'axios';
import type { AnalysisResponse } from '../types/analysis';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('gh_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function analyzeRepository(repoUrl: string): Promise<AnalysisResponse> {
  const { data } = await api.post<AnalysisResponse>('/review', { repoUrl });
  return data;
}

export async function exchangeToken(code: string, redirectUri: string) {
  console.log('Token in storage:', localStorage.getItem('gh_token'));
  console.log('Sending code:', code);
  const params = new URLSearchParams({
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  const { data } = await api.post('/auth/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  return data as { access_token: string };
}

export async function getUserInfo() {
  const token = localStorage.getItem('gh_token');
  const { data } = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // has .login, .avatar_url, .name, .id
}