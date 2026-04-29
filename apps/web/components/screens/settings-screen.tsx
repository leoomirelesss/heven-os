import { Card } from '../ui/card';

const groups = [
  { name: 'Account', items: ['Profile', 'Security', 'Team roles'] },
  { name: 'Billing', items: ['Plan and usage', 'Invoices', 'Payment methods'] },
  { name: 'Integrations', items: ['WhatsApp', 'Google Ads', 'Meta'] },
  { name: 'Workspace', items: ['Brand', 'Domains', 'Localization'] },
];

export function SettingsScreen() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Settings</h2><p className="text-sm text-muted">Manage account, billing, integrations, and workspace controls.</p></div>
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <Card key={group.name} className="p-4">
            <h3 className="font-medium mb-3">{group.name}</h3>
            <div className="space-y-2">{group.items.map((item) => <div key={item} className="rounded-md border border-white/10 px-3 py-2 text-sm text-muted">{item}</div>)}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
