export default function Spinner({ label = "Loading…", className = "py-24" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status">
      <span className="loading loading-spinner loading-lg text-primary" />
      <span className="text-sm opacity-70">{label}</span>
    </div>
  );
}
