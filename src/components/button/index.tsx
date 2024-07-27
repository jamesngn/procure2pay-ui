import cl from 'classnames';
import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

interface IProps {
  children?: ReactNode;
  id?: string | number;
  onClick?: (data?: any) => void;
  className?: string;
  color?: 'green' | 'red' | 'yellow' | 'gray' | 'gray-1' | 'blue';
  disabled?: boolean;
  iconSrc?: string;
  fullWidth?: boolean;
  width?: number | string;
  height?: number | string;
  isUppercase?: boolean;
  isLoading?: boolean;
  prefixLoading?: boolean;
  style?: {};
  noBackground?: boolean;
  isCursorPointer?: boolean;
  textColor?: 'green' | 'red' | 'yellow';
  variant?: 'outline';
}

const VcButton = (props: IProps) => {
  const {
    children,
    onClick = () => {},
    className,
    color = 'green',
    style,
    iconSrc,
    disabled,
    fullWidth,
    width,
    height,
    isLoading,
    isUppercase = true,
    noBackground,
    textColor,
    id,
    isCursorPointer = true,
    prefixLoading,
    variant
  } = props;
  const sliderClasses = cl([
    'vc-button',
    styles['vc-button'],
    className,
    styles[color],
    disabled && styles['disabled'],
    isCursorPointer && styles['cursor-pointer'],
    !isCursorPointer && styles['no-cursor-pointer'],
    fullWidth && styles['full-width'],
    isUppercase && styles['uppercase'],
    noBackground && styles['btn-no-background'],
    isLoading && styles['loading'],
    variant && styles[variant]
  ]);

  const handleClick = (isButtonClick: boolean) => {
    if (isButtonClick && !noBackground) onClick(id);
    if (!isButtonClick && noBackground) onClick(id);
  };

  return (
    <button
      onClick={() => handleClick(true)}
      className={sliderClasses}
      disabled={disabled || isLoading}
      style={{
        ...style,
        width,
        height,
        background: noBackground ? 'none' : '',
        borderColor: variant ? textColor : ''
      }}
    >
      <div className={`btn-label ${textColor || ''}`} onClick={() => handleClick(false)}>
        {!!iconSrc && !isLoading && <img src={iconSrc} alt="icon message" />}
        {isLoading && prefixLoading ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={'/images/ic_loading.svg'} alt="icon message" />
            <span className="btn-label-text">{children}</span>
          </div>
        ) : isLoading && !prefixLoading ? (
          <img src={'/images/ic_loading.svg'} alt="icon message" />
        ) : (
          children
        )}
      </div>
    </button>
  );
};

export default VcButton;
