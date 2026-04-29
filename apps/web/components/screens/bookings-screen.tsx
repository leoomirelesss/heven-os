import { Card } from '../ui/card';

export function BookingsScreen() {
  const bookings = [
    { time: '10:00', customer: 'Sarah Johnson', service: 'Consultation', status: 'Confirmed' },
    { time: '13:30', customer: 'Diego Ramírez', service: 'Custom design', status: 'Pending' },
    { time: '15:00', customer: 'Camila Ortega', service: 'Pickup', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Bookings</h2><p className="text-sm text-muted">Appointment calendar and service operations.</p></div>
      <Card className="p-4 space-y-2">
        {bookings.map((booking) => <div key={booking.time} className="flex items-center justify-between rounded-lg border border-white/10 p-3 text-sm"><span>{booking.time} • {booking.customer}</span><span className="text-muted">{booking.service} • {booking.status}</span></div>)}
      </Card>
    </div>
  );
}
