export default function BrandSeal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 4" opacity="0.6" />
      <text
        x="60"
        y="55"
        textAnchor="middle"
        className="font-serif italic"
        style={{ fontSize: "26px", fill: "currentColor" }}
      >
        MC
      </text>
      <text
        x="60"
        y="72"
        textAnchor="middle"
        className="font-mono uppercase"
        style={{ fontSize: "6px", letterSpacing: "0.25em", fill: "currentColor", opacity: 0.75 }}
      >
        Yamoussoukro
      </text>
    </svg>
  );
}
