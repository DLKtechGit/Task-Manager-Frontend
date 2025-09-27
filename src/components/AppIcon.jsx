import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import './Icon.css';

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}) {
    const IconComponent = LucideIcons?.[name];

    // Combine classes
    const iconClasses = `icon ${className}`.trim();

    if (!IconComponent) {
        return (
            <HelpCircle 
                size={size} 
                color="gray" 
                strokeWidth={strokeWidth} 
                className={`icon icon-fallback ${className}`.trim()} 
                {...props} 
            />
        );
    }

    return (
        <IconComponent
            size={size}
            color={color}
            strokeWidth={strokeWidth}
            className={iconClasses}
            {...props}
        />
    );
}

export default Icon;