import { bookings } from '../../lib/mock-data/heven';
import { Card } from '../ui/card';

export function BookingsScreen() {

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Bookings</h2><p className="text-sm text-muted">Appointment calendar and service operations.</p></div>
      <Card className="p-4 space-y-2">
        {bookings.map((booking) => <div key={booking.id} className="flex items-center justify-between rounded-lg border border-white/10 p-3 text-sm"><span>{booking.id} • {booking.customer}</span><span className="text-muted">{booking.service} • {booking.status}</span></div>)}
      </Card>
    </div>
  );
}
