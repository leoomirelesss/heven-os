import { getDemoUser } from './demo-mode';

const k = 'heven_demo_user';
const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));

export async function signInWithEmail(email: string, _password: string) { await sleep(700); localStorage.setItem(k, JSON.stringify({ ...getDemoUser(), email })); return true; }
export async function signUpWithEmail(email: string, _password: string) { await sleep(900); localStorage.setItem(k, JSON.stringify({ ...getDemoUser(), email })); return true; }
export async function signInWithOAuth(provider: 'google'|'github') { await sleep(800); localStorage.setItem(k, JSON.stringify({ ...getDemoUser(), email: `${provider}@demo.heven.ai` })); return true; }
export async function signOut() { localStorage.removeItem(k); return true; }
export function getCurrentUser() { const raw = typeof window !== 'undefined' ? localStorage.getItem(k) : null; return raw ? JSON.parse(raw) : null; }
// TODO: Replace localStorage mock with Supabase Auth session methods.
