import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import './Button.css';
import Icon from '../AppIcon';

// Helper function to combine class names (similar to cn utility)
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Button = React.forwardRef(({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    children,
    loading = false,
    iconName = null,
    iconPosition = 'left',
    iconSize = null,
    fullWidth = false,
    disabled = false,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : "button";

    // Icon size mapping based on button size
    const iconSizeMap = {
        xs: 12,
        sm: 14,
        default: 16,
        lg: 18,
        xl: 20,
        icon: 16,
    };

    const calculatedIconSize = iconSize || iconSizeMap[size] || 16;

    // Loading spinner
    const LoadingSpinner = () => (
        <svg className="btn-loading-spinner" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    );

    const renderIcon = () => {
        if (!iconName) return null;
        try {
            return (
                <Icon
                    name={iconName}
                    size={calculatedIconSize}
                    className={cn(
                        children && iconPosition === 'left' && "btn-icon-left",
                        children && iconPosition === 'right' && "btn-icon-right"
                    )}
                />
            );
        } catch {
            return null;
        }
    };

    // Base button classes
    const baseClasses = cn(
        'btn',
        `btn-${variant}`,
        `btn-${size === 'default' ? 'default-size' : size}`,
        fullWidth && 'btn-full-width',
        className
    );

    const renderFallbackButton = () => (
        <button
            className={baseClasses}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {iconName && iconPosition === 'left' && renderIcon()}
            {children}
            {iconName && iconPosition === 'right' && renderIcon()}
        </button>
    );

    // When asChild is true, merge icons into the child element
    if (asChild) {
        try {
            if (!children || React.Children.count(children) !== 1) {
                return renderFallbackButton();
            }

            const child = React.Children.only(children);

            if (!React.isValidElement(child)) {
                return renderFallbackButton();
            }

            const content = (
                <>
                    {loading && <LoadingSpinner />}
                    {iconName && iconPosition === 'left' && renderIcon()}
                    {child.props.children}
                    {iconName && iconPosition === 'right' && renderIcon()}
                </>
            );

            const clonedChild = React.cloneElement(child, {
                className: cn(baseClasses, child.props.className),
                disabled: disabled || loading || child.props.disabled,
                children: content,
            });

            return <Comp ref={ref} {...props}>{clonedChild}</Comp>;
        } catch {
            return renderFallbackButton();
        }
    }

    return (
        <Comp
            className={baseClasses}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {iconName && iconPosition === 'left' && renderIcon()}
            {children}
            {iconName && iconPosition === 'right' && renderIcon()}
        </Comp>
    );
});

Button.displayName = "Button";
export default Button;