import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold',
  secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
  outline: 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10',
  ghost: 'text-gray-400 hover:text-white hover:bg-gray-800',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export default function Button({ variant = 'primary', size = 'md', children, href, onClick, type = 'button', disabled, className = '' }: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{children}</button>;
}
