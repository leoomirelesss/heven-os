import { shipments } from '../../lib/mock-data/heven';
import { Card } from '../ui/card';

export function ShippingScreen() {

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Shipping</h2><p className="text-sm text-muted">Logistics and fulfillment overview.</p></div>
      <Card className="p-4 space-y-2">
        {shipments.map((shipment) => <div key={shipment.id} className="flex items-center justify-between rounded-lg border border-white/10 p-3 text-sm"><span>{shipment.id} • {shipment.order}</span><span className="text-muted">{shipment.carrier} • {shipment.status} • {shipment.tracking}</span></div>)}
      </Card>
    </div>
  );
}
