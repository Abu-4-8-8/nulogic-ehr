import React from 'react';
import { Tooltip } from '@mui/material';

interface PillIconProps {
    width?: number;
    height?: number;
    fill?: string;
    className?: string;
    tooltip?: string;
    tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

const PillIcon: React.FC<PillIconProps> = ({
    width = 17,
    height = 17,
    fill = "#21262B",
    className,
    tooltip,
    tooltipPlacement = 'top'
}) => {
    const iconElement = (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 800 800" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ display: 'block' }}
        >
            <path d="M462.875 721.625C534 792.75 650.438 792.75 721.625 721.625C792.75 650.5 792.75 534.062 721.625 462.875L529.375 270.625L270.625 529.375L462.875 721.625Z" fill="#F44336"/>
            <path d="M529.375 270.625L337.125 78.375C266 7.25 149.563 7.25 78.375 78.375C7.25 149.5 7.25 265.937 78.375 337.125L270.625 529.375L529.375 270.625Z" fill="#FDD835"/>
            <path d="M542.626 283.905L283.876 542.655L270.613 529.398L529.363 270.648L542.626 283.905Z" fill="#C62828"/>
            <g opacity="0.65">
                <path d="M433.938 226.561C509.938 309.374 647.813 465.624 647.813 465.624C665.688 481.936 690.251 523.999 674.188 538.499C657.063 553.999 617.188 521.311 599.313 504.999L307.626 230.561C289.813 214.249 230.188 161.436 241.813 124.249C263.751 54.061 349.313 134.311 433.938 226.561Z" fill="white"/>
            </g>
        </svg>

    );

    if (tooltip) {
        return (
            <Tooltip title={tooltip} placement={tooltipPlacement} arrow>
                {iconElement}
            </Tooltip>
        );
    }

    return iconElement;
};

export default PillIcon;
