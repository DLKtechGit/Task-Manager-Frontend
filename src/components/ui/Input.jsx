import React from "react";
import "./Input.css";

// Helper function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Input = React.forwardRef(({
    className,
    type = "text",
    label,
    description,
    error,
    required = false,
    id,
    ...props
}, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Checkbox-specific styles
    if (type === "checkbox") {
        return (
            <input
                type="checkbox"
                className={cn(
                    "input-checkbox",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />
        );
    }

    // Radio button-specific styles
    if (type === "radio") {
        return (
            <input
                type="radio"
                className={cn(
                    "input-radio",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />
        );
    }

    // For regular inputs with wrapper structure
    return (
        <div className="input-wrapper">
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "input-label",
                        error && "error",
                        props.disabled && "disabled"
                    )}
                >
                    {label}
                    {required && <span className="input-required">*</span>}
                </label>
            )}

            <input
                type={type}
                className={cn(
                    "input-base",
                    error && "error",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />

            {description && !error && (
                <p className="input-description">
                    {description}
                </p>
            )}

            {error && (
                <p className="input-error">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;