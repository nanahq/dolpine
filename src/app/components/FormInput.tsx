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
        'border-2 border-nana-stone/20',
        'hover:border-nana-blue active:border-nana-blue',
        'transition duration-300 ease-in-out',
      )}
      data-testid="input-component"
    >
      {label && (
        <label
          className={clsx(
            'absolute top-[.65rem] text-nana-stone/50 pointer-events-none',
            'transition duration-200 ease-in-out truncate',
            isFocused || value
              ? 'translate-y-[-0.6rem] left-[1.75rem] mr-2 text-sm scale-75'
              : 'text-base top-0 ml-[.7rem]',
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
            'w-full py-[10px] mt-1 text-gray-500 text-base focus:outline-none',
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


{/* <div className="relative flex flex-col">
  <Input
    label="Choose a delivery address"
    type="text"
    value={val}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      setVal(e.target.value)
    }
    start={{
      before: (
        <Image
          src={LocationIcon}
          width={0}
          height={0}
          alt="icon"
          className="size-5"
        />
      ),
      after: (
        <Image
          src={FilledLocationIcon}
          width={0}
          height={0}
          alt="icon"
          className="size-4"
        />
      ),
    }}
  />
</div>; */}