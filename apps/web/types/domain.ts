export type Product = {
  id: string;
  name: string;
  description?: string | null;
  sku: string;
  price: string;
  currency: string;
  stock: number;
  status: string;
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  tags: string[];
  notes?: string | null;
  createdAt: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: string;
  product?: Product;
};

export type Order = {
  id: string;
  customerId: string;
  status: string;
  total: string;
  currency: string;
  createdAt: string;
  customer?: Customer;
  items?: OrderItem[];
};

export type DashboardMetrics = {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
};
