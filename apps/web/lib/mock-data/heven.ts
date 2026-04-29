export const business = {
  name: 'Luna Jewelry MX',
  description: 'Minimalist jewelry handcrafted in Mexico with premium LATAM shipping.',
  domain: 'lunajewelry.mx',
};

export const dashboardStats = [
  { label: 'Revenue', value: '$148,240', change: '+18.2%', trend: 'up' },
  { label: 'Orders', value: '1,842', change: '+9.4%', trend: 'up' },
  { label: 'Customers', value: '986', change: '+12.1%', trend: 'up' },
  { label: 'Conversion', value: '3.9%', change: '-0.8%', trend: 'down' },
  { label: 'Pending Messages', value: '27', change: '+6', trend: 'up' },
  { label: 'Active Automations', value: '14', change: '+2', trend: 'up' },
];

export const revenueSeries = [
  { month: 'Jan', revenue: 19000, conversion: 3.4, customers: 540 },
  { month: 'Feb', revenue: 22000, conversion: 3.5, customers: 620 },
  { month: 'Mar', revenue: 24500, conversion: 3.8, customers: 700 },
  { month: 'Apr', revenue: 27800, conversion: 3.7, customers: 790 },
  { month: 'May', revenue: 30100, conversion: 4.0, customers: 890 },
  { month: 'Jun', revenue: 33600, conversion: 4.2, customers: 986 },
];

export const products = [
  { id: 'P-1001', name: 'Silver Minimal Ring', category: 'Rings', price: '$89', stock: 42, status: 'Active' },
  { id: 'P-1002', name: 'Gold Vermeil Necklace', category: 'Necklaces', price: '$145', stock: 18, status: 'Active' },
  { id: 'P-1003', name: 'Pearl Drop Earrings', category: 'Earrings', price: '$67', stock: 35, status: 'Active' },
  { id: 'P-1004', name: 'Minimal Cuff Bracelet', category: 'Bracelets', price: '$98', stock: 0, status: 'Draft' },
];

export const orders = [
  { id: '#8472', customer: 'Sarah Johnson', total: '$124', status: 'Completed', date: '2026-04-26' },
  { id: '#8471', customer: 'Michael Chen', total: '$89', status: 'Processing', date: '2026-04-26' },
  { id: '#8470', customer: 'Emma Davis', total: '$256', status: 'Shipped', date: '2026-04-25' },
];

export const customers = [
  { id: 'C-201', name: 'Sarah Johnson', email: 'sarah@lunajewelry.mx', tags: ['VIP', 'Wholesale'], status: 'Active', ltv: '$2,400' },
  { id: 'C-202', name: 'Diego Ramírez', email: 'diego@correo.mx', tags: ['New'], status: 'Trial', ltv: '$220' },
  { id: 'C-203', name: 'Camila Ortega', email: 'camila@studio.mx', tags: ['Returning'], status: 'Active', ltv: '$1,120' },
  { id: 'C-204', name: 'Noah Williams', email: 'noah@brand.io', tags: ['At Risk'], status: 'Inactive', ltv: '$740' },
];

export const conversations = [
  { id: 'T-1', name: 'Sarah Johnson', channel: 'WhatsApp', subject: 'Can I change my size?', preview: 'Need help updating ring size before shipping.', unread: true },
  { id: 'T-2', name: 'Diego Ramírez', channel: 'Instagram', subject: 'Shipping ETA', preview: 'Do you ship to Guadalajara this week?', unread: true },
  { id: 'T-3', name: 'Camila Ortega', channel: 'Email', subject: 'Bulk order quote', preview: 'Interested in 30 custom bracelets.', unread: false },
];

export const automations = [
  { id: 'A-1', name: 'Abandoned cart recovery', status: 'Active', trigger: 'Cart idle 60m', conversionLift: '+12%' },
  { id: 'A-2', name: 'VIP replenishment reminder', status: 'Active', trigger: 'Last order 30d', conversionLift: '+8%' },
  { id: 'A-3', name: 'First purchase nurture', status: 'Inactive', trigger: 'Order completed', conversionLift: '+5%' },
];

export const trafficSources = [
  { source: 'Instagram Ads', share: '38%' },
  { source: 'Organic Search', share: '26%' },
  { source: 'WhatsApp', share: '19%' },
  { source: 'Referrals', share: '11%' },
  { source: 'Email', share: '6%' },
];

export const generationSteps = [
  'Creating brand identity',
  'Generating website structure',
  'Creating products',
  'Configuring automations',
  'Preparing dashboard',
];
