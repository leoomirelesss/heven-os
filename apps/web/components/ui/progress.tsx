export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/10">
      <div className="h-2 rounded-full bg-accent transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
