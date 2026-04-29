import { Card } from '../ui/card';

export function ShippingScreen() {
  const shipments = [
    { id: 'SHP-0041', order: '#8472', carrier: 'FedEx', status: 'Delivered' },
    { id: 'SHP-0040', order: '#8471', carrier: 'UPS', status: 'In Transit' },
    { id: 'SHP-0039', order: '#8470', carrier: 'DHL', status: 'Processing' },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Shipping</h2><p className="text-sm text-muted">Logistics and fulfillment overview.</p></div>
      <Card className="p-4 space-y-2">
        {shipments.map((shipment) => <div key={shipment.id} className="flex items-center justify-between rounded-lg border border-white/10 p-3 text-sm"><span>{shipment.id} • {shipment.order}</span><span className="text-muted">{shipment.carrier} • {shipment.status}</span></div>)}
      </Card>
    </div>
  );
}
