import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/segment';
import { nanoid } from 'nanoid';
import Cookies from 'js-cookie';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    let trackingCookie = Cookies.get('TRACKING_UUID_NANA');

    if (!trackingCookie) {
      const id = nanoid();
      Cookies.set('TRACKING_UUID_NANA', id, { expires: 180 });
      trackingCookie = id;
    }

    analytics.identify(trackingCookie);
    analytics.page();
  }, [pathname]);

  return null;
}
