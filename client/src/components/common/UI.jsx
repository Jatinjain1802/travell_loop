import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({ className, variant = 'primary', size = 'md', children, ...props }) {
  const variants = {
    primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02]',
    secondary: 'bg-secondary text-white shadow-lg shadow-secondary/20 hover:bg-secondary/90 hover:scale-[1.02]',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
    ghost: 'bg-transparent text-muted hover:bg-slate-100',
    danger: 'bg-destructive text-white hover:bg-destructive/90',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-xl font-bold',
    md: 'px-6 py-3 text-sm rounded-2xl font-bold',
    lg: 'px-8 py-4 text-base rounded-2xl font-black',
    xl: 'px-10 py-5 text-lg rounded-3xl font-black tracking-tight',
  };

  return (
    <button 
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
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

export function Card({ className, children, padding = 'md', hover = true, ...props }) {
  const paddings = {
    none: 'p-0',
    sm: 'p-6',
    md: 'p-10',
    lg: 'p-16',
  };

  return (
    <div 
      className={cn(
        'bg-white border border-slate-100 rounded-3xl shadow-premium relative group/card',
        hover && 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
        paddings[padding],
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function Input({ className, label, error, icon: Icon, ...props }) {
  return (
    <div className="space-y-2 w-full group/input">
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1 group-focus-within/input:text-primary transition-colors">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors group-focus-within/input:text-primary" />}
        <input 
          className={cn(
            'w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-secondary placeholder:text-slate-400 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none',
            Icon && 'pl-12',
            error && 'border-destructive focus:ring-destructive/10',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-bold text-destructive ml-1">{error}</p>}
    </div>
  );
}
