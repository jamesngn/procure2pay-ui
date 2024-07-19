import React from 'react';

import * as icons from './icon-paths';

export type TIconName = keyof typeof icons;

export type IconProps = {
  name?: TIconName;
  className?: string;
  fill?: string;
  height?: string | number;
  style?: React.CSSProperties;
  width?: string | number;
  size?: number;
  svgPath?: string;
};

export const QIcon: React.FC<IconProps> = ({
  name,
  className,
  style,
  fill = 'var(--mantine-primary-color-5)',
  height,
  width,
  size,
  svgPath
}) => {
  const iconHeight = height || size || 24;
  const iconWidth = width || size || 24;

  const iconPath = icons[name] || svgPath;

  return (
    <svg
      className={className}
      fill={fill}
      style={style}
      height={iconWidth}
      width={iconHeight}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${iconWidth} ${iconHeight}`}
    >
      <path d={iconPath} />
    </svg>
  );
};

export const createContextMenuIcon = (icName: TIconName) => {
  const iconPath = icons[icName];

  return `<svg fill="white" height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="${iconPath}" /></svg>`;
};
