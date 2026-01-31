/**
 * Button Component
 * Reusable button component with support for icons, multiple variants, and flexible styling
 * 
 * @param children - Button text content
 * @param onClick - Click handler function
 * @param type - 'button' | 'submit' | 'reset'
 * @param variant - Visual style variant: 'primary' | 'secondary' | 'outlined'
 * @param icon - Optional icon element (SVG component)
 * @param iconPosition - Position of icon relative to text: 'left' | 'right'
 * @param className - Additional CSS classes for custom styling
 * @param disabled - Whether the button is disabled
 * @param ariaLabel - Accessible label for screen readers
 */

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function MyButton({
  children,
  onClick,
  variant = 'secondary',
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const baseStyles = 'cursor-pointer size-10 justify-center items-center  rounded-md px-2 text-body-md leading-body-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50';
  
  const variants = {
    primary: 'bg-charcoal-100 text-white hover:opacity-70 focus:ring-blue-500',
    secondary: 'bg-white border border-charcoal-50 text-charcoal-100 hover:bg-charcoal-10 focus:ring-blue-500',
    outlined: 'bg-transparent text-charcoal-100 hover:bg-charcoal-5 focus:ring-blue-500/20',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${baseStyles} ${variants[variant]} `}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}