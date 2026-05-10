import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes with pixel-perfect precision
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Premium Button Component - Tactical & Accurate
 */
export function Button({ className, variant = 'primary', size = 'md', children, ...props }) {
  const variants = {
    primary: 'bg-primary text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(59,130,246,0.5)_inset] hover:shadow-[0_1px_10px_rgba(59,130,246,0.3),0_0_0_1px_rgba(59,130,246,0.6)_inset] hover:bg-primary/90',
    secondary: 'bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:border-white/20',
    outline: 'bg-transparent border border-border text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/30',
    ghost: 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-white',
    danger: 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[11px] rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-2xl',
    xl: 'px-10 py-5 text-lg rounded-3xl font-black tracking-tight',
  };

  return (
    <button 
      className={cn(
        'inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Premium Card Component - Layered Depth
 */
export function Card({ className, children, padding = 'md', hover = true, ...props }) {
  const paddings = {
    none: 'p-0',
    sm: 'p-5',
    md: 'p-10',
    lg: 'p-16',
  };

  return (
    <div 
      className={cn(
        'bg-card border border-white/5 rounded-2xl shadow-premium relative group/card',
        hover && 'hover:border-white/10 hover:shadow-glow transition-all duration-500',
        paddings[padding],
        className
      )}
      {...props}
    >
      {/* Inner Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/3 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * Premium Input Component - Focus Accuracy
 */
export function Input({ className, label, error, icon: Icon, ...props }) {
  return (
    <div className="space-y-2 w-full group/input">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 ml-1 group-focus-within/input:text-primary transition-colors">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 transition-colors group-focus-within/input:text-primary" />}
        <input 
          className={cn(
            'w-full bg-slate-900/50 border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:bg-slate-900 transition-all outline-none',
            Icon && 'pl-12',
            error && 'border-destructive/50 focus:ring-destructive/10 focus:border-destructive',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] font-bold text-destructive animate-in fade-in slide-in-from-top-1 ml-1">{error}</p>}
    </div>
  );
}
