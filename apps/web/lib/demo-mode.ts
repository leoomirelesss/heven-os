import { business } from './mock-data/heven';

export const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;
export const getDemoUser = () => ({ id: 'u-demo', name: 'Demo Founder', email: 'founder@heven.ai' });
export const getDemoProject = () => ({ id: 'proj-luna', name: business.name, type: 'Ecommerce' });
