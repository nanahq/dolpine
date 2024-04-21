import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Dropdown from '@/assets/dropdown.svg';

interface DropdownLinksProps {
  title: string;
  children: React.ReactNode;
}

const DropdownLinks: React.FC<DropdownLinksProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between text-base gap-1 hover:underline items-center w-full focus:outline-1"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="true"
      >
        <span className="font-semibold text-sm lg:text-base text-gray-400 transition-all duration-200">
          {title}
        </span>
        <Image
          src={Dropdown}
          alt="Dropdown Arrow"
          className={classNames('transform  transition-transform lg:hidden', {
            'rotate-180': isOpen,
          })}
          width="0"
          height="0"
        />
      </button>
      <div
        className={classNames(
          'lg:text-base flex flex-col justify-between gap-2',
          {
            hidden: !isOpen,
            '': isOpen,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownLinks;
