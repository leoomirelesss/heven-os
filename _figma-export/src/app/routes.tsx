import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AIBuilder } from "./components/AIBuilder";
import { AIGeneration } from "./components/AIGeneration";
import { AIResult } from "./components/AIResult";
import { Dashboard } from "./components/Dashboard";
import { StoreBuilder } from "./components/StoreBuilder";
import { Customers } from "./components/Customers";
import { Inbox } from "./components/Inbox";
import { Automations } from "./components/Automations";
import { Analytics } from "./components/Analytics";
import { Settings } from "./components/Settings";
import { Bookings } from "./components/Bookings";
import { Shipping } from "./components/Shipping";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AIBuilder />,
  },
  {
    path: "/generating",
    element: <AIGeneration />,
  },
  {
    path: "/generated",
    element: <AIResult />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "store", element: <StoreBuilder /> },
      { path: "customers", element: <Customers /> },
      { path: "inbox", element: <Inbox /> },
      { path: "automations", element: <Automations /> },
      { path: "analytics", element: <Analytics /> },
      { path: "bookings", element: <Bookings /> },
      { path: "shipping", element: <Shipping /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
