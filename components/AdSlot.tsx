'use client';

export default function AdSlot({
  slot,
  className = '',
}: {
  slot: string;
  className?: string;
}) {
  return (
    <div className={`my-4 mx-auto max-w-[728px] ${className}`}>
      <div className="w-full min-h-[90px] bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
        Advertisement
      </div>
    </div>
  );
}
