import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, X, MapPin, Video, Phone } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const bookings = [
  {
    id: 1,
    customer: "Sarah Johnson",
    initials: "SJ",
    service: "Jewelry Consultation",
    date: "Mar 27",
    day: 27,
    month: 2,
    year: 2026,
    time: "10:00 AM",
    duration: "60 min",
    type: "In-person",
    location: "Studio MX",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Michael Chen",
    initials: "MC",
    service: "Custom Ring Design",
    date: "Mar 27",
    day: 27,
    month: 2,
    year: 2026,
    time: "2:30 PM",
    duration: "45 min",
    type: "Video call",
    location: "Zoom",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Emma Davis",
    initials: "ED",
    service: "Jewelry Appraisal",
    date: "Mar 28",
    day: 28,
    month: 2,
    year: 2026,
    time: "11:00 AM",
    duration: "30 min",
    type: "In-person",
    location: "Studio MX",
    status: "Pending",
  },
  {
    id: 4,
    customer: "James Wilson",
    initials: "JW",
    service: "Repair Consultation",
    date: "Mar 29",
    day: 29,
    month: 2,
    year: 2026,
    time: "3:00 PM",
    duration: "30 min",
    type: "Phone",
    location: "+1 (555) 345-6789",
    status: "Cancelled",
  },
  {
    id: 5,
    customer: "Lisa Anderson",
    initials: "LA",
    service: "Jewelry Consultation",
    date: "Apr 1",
    day: 1,
    month: 3,
    year: 2026,
    time: "10:00 AM",
    duration: "60 min",
    type: "In-person",
    location: "Studio MX",
    status: "Confirmed",
  },
  {
    id: 6,
    customer: "David Park",
    initials: "DP",
    service: "Custom Necklace Design",
    date: "Apr 2",
    day: 2,
    month: 3,
    year: 2026,
    time: "1:00 PM",
    duration: "45 min",
    type: "Video call",
    location: "Zoom",
    status: "Pending",
  },
  {
    id: 7,
    customer: "Sophia Martínez",
    initials: "SM",
    service: "Bridal Jewelry Consult",
    date: "Apr 4",
    day: 4,
    month: 3,
    year: 2026,
    time: "11:30 AM",
    duration: "90 min",
    type: "In-person",
    location: "Studio MX",
    status: "Confirmed",
  },
];

const statusStyles: Record<string, string> = {
  Confirmed: "bg-emerald-400/10 text-emerald-400",
  Pending: "bg-amber-400/10 text-amber-400",
  Cancelled: "bg-red-400/10 text-red-400",
};

const statusDot: Record<string, string> = {
  Confirmed: "bg-emerald-400",
  Pending: "bg-amber-400",
  Cancelled: "bg-red-400",
};

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

const typeIcon: Record<string, typeof Video> = {
  "Video call": Video,
  "Phone": Phone,
  "In-person": MapPin,
};

export function Bookings() {
  const today = { day: 27, month: 2, year: 2026 };
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(2); // March
  const [selectedDay, setSelectedDay] = useState<number | null>(27);
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  const calendarDays = getCalendarDays(viewYear, viewMonth);

  // Days that have bookings this month
  const bookedDays = new Set(
    bookings
      .filter((b) => b.month === viewMonth && b.year === viewYear)
      .map((b) => b.day)
  );

  const filteredBookings = selectedDay
    ? bookings.filter((b) => b.day === selectedDay && b.month === viewMonth && b.year === viewYear)
    : bookings.filter((b) => {
        const bDate = new Date(b.year, b.month, b.day);
        const todayDate = new Date(today.year, today.month, today.day);
        return bDate >= todayDate;
      });

  const detail = bookings.find((b) => b.id === selectedBooking);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
    setSelectedDay(null);
  };

  const stats = [
    { label: "Today", value: bookings.filter((b) => b.day === today.day && b.month === today.month).length.toString() },
    { label: "This Week", value: "5" },
    { label: "Upcoming", value: bookings.filter((b) => b.status !== "Cancelled").length.toString() },
    { label: "Cancelled", value: bookings.filter((b) => b.status === "Cancelled").length.toString() },
  ];

  return (
    <div className="flex h-full">
      {/* Main area */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Schedule</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Bookings</h1>
            <p className="text-[13px] text-white/40 mt-1">Manage appointments and consultations.</p>
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-white text-black rounded-lg text-[13px] font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/10">
            <Plus className="w-3.5 h-3.5" />
            New Booking
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl">
              <div className="text-[11px] font-medium text-white/35 uppercase tracking-wide mb-2">{s.label}</div>
              <div className="text-[26px] font-semibold tracking-tight text-white">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
          {/* Calendar */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 h-fit">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="w-7 h-7 rounded-md hover:bg-white/[0.06] flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-white/40" />
              </button>
              <span className="text-[13px] font-semibold text-white">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                onClick={nextMonth}
                className="w-7 h-7 rounded-md hover:bg-white/[0.06] flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-1">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center text-[11px] font-semibold text-white/25 py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {calendarDays.map((day, i) => {
                const isToday = day === today.day && viewMonth === today.month && viewYear === today.year;
                const isSelected = day === selectedDay;
                const hasBooking = day !== null && bookedDays.has(day);

                return (
                  <div key={i} className="flex flex-col items-center py-0.5">
                    {day !== null ? (
                      <button
                        onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                        className={`w-8 h-8 rounded-lg text-[12px] font-medium transition-all duration-150 relative flex items-center justify-center ${
                          isSelected
                            ? "bg-white text-black"
                            : isToday
                            ? "bg-white/[0.1] text-white border border-white/20"
                            : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                        }`}
                      >
                        {day}
                        {hasBooking && !isSelected && (
                          <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isToday ? "bg-white/60" : "bg-white/35"}`} />
                        )}
                      </button>
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="text-[11px] text-white/30">Has bookings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-4 rounded-md bg-white/10 border border-white/20" />
                <span className="text-[11px] text-white/30">Today</span>
              </div>
            </div>
          </div>

          {/* Bookings list */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
            {/* List header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
              <span className="text-[13px] font-semibold text-white">
                {selectedDay
                  ? `${MONTH_NAMES[viewMonth].slice(0, 3)} ${selectedDay} — ${filteredBookings.length} booking${filteredBookings.length !== 1 ? "s" : ""}`
                  : `Upcoming — ${filteredBookings.length} bookings`}
              </span>
              {selectedDay && (
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
                >
                  Show all
                </button>
              )}
            </div>

            {filteredBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-white/20" />
                </div>
                <p className="text-[13px] text-white/30">No bookings on this day</p>
                <p className="text-[12px] text-white/20 mt-1">Select a different date or create a booking</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {filteredBookings.map((booking) => {
                  const TypeIcon = typeIcon[booking.type] || MapPin;
                  return (
                    <button
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking.id === selectedBooking ? null : booking.id)}
                      className={`w-full text-left px-5 py-4 hover:bg-white/[0.03] transition-all duration-150 ${
                        selectedBooking === booking.id ? "bg-white/[0.04]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Time column */}
                        <div className="w-16 flex-shrink-0 text-right">
                          <div className="text-[12px] font-semibold text-white/60">{booking.time}</div>
                          <div className="text-[11px] text-white/25">{booking.duration}</div>
                        </div>

                        {/* Divider line */}
                        <div className="flex flex-col items-center self-stretch flex-shrink-0">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${statusDot[booking.status]}`} />
                          <div className="w-px flex-1 bg-white/[0.06] mt-1" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[13px] font-semibold text-white/85">{booking.service}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${statusStyles[booking.status]}`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[12px] text-white/35">
                            <span>{booking.customer}</span>
                            <span className="flex items-center gap-1">
                              <TypeIcon className="w-3 h-3" />
                              {booking.location}
                            </span>
                          </div>
                        </div>

                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-white/[0.07] border border-white/[0.09] flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-semibold text-white/50">{booking.initials}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {detail && (
        <div className="w-72 border-l border-white/[0.07] flex flex-col flex-shrink-0">
          <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
            <span className="text-[13px] font-semibold text-white">Booking Details</span>
            <button
              onClick={() => setSelectedBooking(null)}
              className="w-6 h-6 rounded-md hover:bg-white/[0.08] flex items-center justify-center transition-all"
            >
              <X className="w-3.5 h-3.5 text-white/35" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-5">
            {/* Customer */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/[0.07]">
              <div className="w-11 h-11 rounded-full bg-white/[0.07] border border-white/[0.09] flex items-center justify-center flex-shrink-0">
                <span className="text-[13px] font-semibold text-white/50">{detail.initials}</span>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-white">{detail.customer}</div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[detail.status]}`}>
                  {detail.status}
                </span>
              </div>
            </div>

            {/* Service */}
            <div className="mb-4">
              <div className="text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-2">Service</div>
              <div className="text-[14px] font-semibold text-white">{detail.service}</div>
              <div className="text-[12px] text-white/40 mt-0.5">{detail.duration} session</div>
            </div>

            {/* Date & time */}
            <div className="space-y-2.5 mb-5 pb-5 border-b border-white/[0.07]">
              {[
                { label: "Date", value: `${detail.date}, ${detail.year}` },
                { label: "Time", value: detail.time },
                { label: "Duration", value: detail.duration },
                { label: "Type", value: detail.type },
                { label: "Location", value: detail.location },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-[12px] text-white/35">{row.label}</span>
                  <span className="text-[12px] font-medium text-white/70">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {detail.status !== "Cancelled" && (
                <button className="w-full px-4 py-2.5 bg-white text-black rounded-lg text-[12px] font-semibold hover:bg-white/90 transition-all">
                  Send Reminder
                </button>
              )}
              <button className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[12px] font-medium text-white/50 hover:bg-white/[0.07] hover:text-white/70 transition-all">
                Reschedule
              </button>
              {detail.status !== "Cancelled" && (
                <button className="w-full px-4 py-2.5 bg-red-400/[0.08] rounded-lg text-[12px] font-medium text-red-400/70 hover:bg-red-400/[0.14] transition-all">
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}