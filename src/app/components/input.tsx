import clsx from 'clsx';
import React, { useState } from 'react';

interface Icon {
  before: any;
  after: any;
}
interface Props {
  type?: 'text' | 'email';
  value?: any;
  label?: string;
  start?: Icon | any;

  className?: string;
  labelClassName?: string;
  styles?: React.CSSProperties;

  onChange?(e: any): void;
}

const Input: React.FC<Props> = (props: Props) => {
  const { className, type, label, value, start, onChange } = props;
  const [isFocused, setIsFocused] = useState(false);

  const hasIcon = start !== undefined;
  const hasMultipleIcon = hasIcon && ('before' in start || 'after' in start);
  const startIcon = hasMultipleIcon
    ? !value
      ? start.before
      : start.after
    : start;

  return (
    <div
      className={clsx(
        'relative w-full bg-white rounded-lg truncate overflow-hidden font-light',
        'focus:border-[2px] ',
        'border-2 border-gray-500',
        'hover:border-nana-blue active:border-nana-blue',
        'transition duration-300 ease-in-out',
      )}
      data-testid="input-component"
    >
      {label && (
        <label
          className={clsx(
            'absolute top-[0.8rem] px-4 text-gray-500/50 pointer-events-none',
            'transition duration-100 ease-out truncate',
            isFocused || value ? 'translate-y-[-0.6rem] text-xs' : 'text-sm',
            start && 'left-9',
          )}
        >
          {label}
        </label>
      )}
      <div className="flex px-4 cursor-text items-center">
        {hasIcon && <div className="mr-4">{startIcon}</div>}
        <input
          className={clsx(
            'w-full py-[20px] pb-[6px] text-gray-500 text-xs focus:outline-none',
            className,
          )}
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onChange && onChange(e)}
        />
      </div>
    </div>
  );
};

export type { Props };
export default Input;
