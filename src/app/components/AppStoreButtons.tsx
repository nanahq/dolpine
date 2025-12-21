import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import GooglePlay from '@/assets/google-play.svg';
import AppStore from '@/assets/app-store.svg';

interface AppStoreButtonsProps {
    className?: string;
    showGooglePlay?: boolean;
    showAppStore?: boolean;
}

export const AppStoreButtons: React.FC<AppStoreButtonsProps> = ({
    className,
    showGooglePlay = true,
    showAppStore = true,
}) => {
    return (
        <div
            className={classNames(
                'flex flex-col gap-2 md:flex-row md:gap-4 md:items-center',
                className,
            )}
        >
            {showGooglePlay && (
                <Link
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.nanaeats.nana_app&pcampaignid=web_share"
                    className="group"
                >
                    <div className="hover:transition-transform hover:duration-100 hover:scale-x-105 hover:scale-y-105">
                        <Image
                            priority={true}
                            className="object-fill w-32 md:w-28 lg:w-36 cursor-pointer"
                            src={GooglePlay}
                            alt="Google Play Store"
                            width={240}
                            height={68}
                        />
                    </div>
                </Link>
            )}
            {showAppStore && (
                <Link href="https://apps.apple.com/us/app/nana-delivery-more/id6499050428">
                    <div className="hover:transition-transform hover:duration-100 hover:scale-x-105 hover:scale-y-105">
                        <Image
                            priority={true}
                            className="object-fill  w-32 md:w-28 lg:w-36  cursor-pointer"
                            src={AppStore}
                            alt="App Store"
                            width="240"
                            height="68"
                        />
                    </div>
                </Link>
            )}
        </div>
    );
};
