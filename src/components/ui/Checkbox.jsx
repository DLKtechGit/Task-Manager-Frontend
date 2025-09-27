import React from "react";
import { Check, Minus } from "lucide-react";
import "./Checkbox.css";

// Helper function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Checkbox = React.forwardRef(({
    className,
    id,
    checked,
    indeterminate = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    size = "default",
    ...props
}, ref) => {
    // Generate unique ID if not provided
    const checkboxId = id || `checkbox-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Size variants mapping
    const sizeClasses = {
        sm: "checkbox-size-sm",
        default: "checkbox-size-default",
        lg: "checkbox-size-lg"
    };

    const iconSizeClasses = {
        sm: "checkbox-icon-sm",
        default: "checkbox-icon-default",
        lg: "checkbox-icon-lg"
    };

    return (
        <div className={cn("checkbox-container", className)}>
            <div className="checkbox-wrapper">
                <input
                    type="checkbox"
                    ref={ref}
                    id={checkboxId}
                    checked={checked}
                    disabled={disabled}
                    required={required}
                    className="checkbox-input"
                    {...props}
                />

                <label
                    htmlFor={checkboxId}
                    className={cn(
                        "checkbox-box",
                        sizeClasses[size],
                        checked && "checked",
                        indeterminate && "indeterminate",
                        error && "error",
                        disabled && "disabled"
                    )}
                >
                    {checked && !indeterminate && (
                        <Check className={cn("checkbox-icon", iconSizeClasses[size])} />
                    )}
                    {indeterminate && (
                        <Minus className={cn("checkbox-icon", iconSizeClasses[size])} />
                    )}
                </label>
            </div>
            {(label || description || error) && (
                <div className="checkbox-content">
                    {label && (
                        <label
                            htmlFor={checkboxId}
                            className={cn(
                                "checkbox-label",
                                error && "error",
                                disabled && "disabled"
                            )}
                        >
                            {label}
                            {required && <span className="checkbox-required">*</span>}
                        </label>
                    )}

                    {description && !error && (
                        <p className="checkbox-description">
                            {description}
                        </p>
                    )}

                    {error && (
                        <p className="checkbox-error">
                            {error}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
});

Checkbox.displayName = "Checkbox";

// Checkbox Group component
const CheckboxGroup = React.forwardRef(({
    className,
    children,
    label,
    description,
    error,
    required = false,
    disabled = false,
    ...props
}, ref) => {
    return (
        <fieldset
            ref={ref}
            disabled={disabled}
            className={cn("checkbox-group", className)}
            {...props}
        >
            {label && (
                <legend className={cn(
                    "checkbox-group-legend",
                    error && "error"
                )}>
                    {label}
                    {required && <span className="checkbox-group-required">*</span>}
                </legend>
            )}

            {description && !error && (
                <p className="checkbox-group-description">
                    {description}
                </p>
            )}

            <div className="checkbox-group-children">
                {children}
            </div>

            {error && (
                <p className="checkbox-group-error">
                    {error}
                </p>
            )}
        </fieldset>
    );
});

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup };