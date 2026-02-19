import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium',
  ghost: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
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
