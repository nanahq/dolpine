import React, { PropsWithChildren } from 'react';
import AppleStore from '@/assets/app-store.svg';
import GooglePlay from '@/assets/google-icon.svg';
import classNames from 'classnames';
export const ActionButton: React.FC<
  PropsWithChildren<{
    style: string;
    onPress?: () => void;
    type: 'ios' | 'android';
  }>
> = (props) => {
  return (
    <button
      onClick={props.onPress}
      className={classNames('rounded-lg md:w-[17em] py-4 px-2', props.style)}
    >
      <div className="flex flex-row items-center justify-center">
        {props.type === 'ios' ? (
          <AppleStore className="" />
        ) : (
          <GooglePlay className="" />
        )}
        <p className="text-white ml-1">{`Download on ${
          props.type === 'ios' ? 'Apple Store' : 'Google Play'
        }`}</p>
      </div>
    </button>
  );
};
