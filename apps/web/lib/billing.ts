const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));
export async function createCheckoutSession(plan: string) { await sleep(1200); return { url: `/billing/checkout-demo?plan=${plan}` }; }
export async function openCustomerPortal() { await sleep(900); return { url: '/billing' }; }
export async function getSubscriptionStatus() { await sleep(400); return { plan: 'Growth', status: 'Active', renewsAt: '2026-05-20' }; }
// TODO: If STRIPE_SECRET_KEY exists, swap to real API route + Stripe SDK.
