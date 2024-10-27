export function Text({ className, children }) {
  return (
    <div className={`font-bold text-white text-outline ${className}`}>
      {children}
    </div>
  );
}
