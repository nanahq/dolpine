"use client"
import { useEffect } from 'react';

declare global {
    interface Window {
        PayonusGateway: any;
    }
}

type CurrencyType = 'NGN' | 'USD';

interface ConfigOptionsTypes {
    environment: 'sandbox' | 'live';
    secretKey: string;
    amount: number;
    email: string;
    name: string;
    currency: CurrencyType;
    transactionRef: string;
    mobileNumber?: string;
    onSuccess?: (payload: any) => void;
    onFailure?: (error: any) => void;
    onPending?: (data: any) => void;
}

const PaymentPage: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://uatpay.payonus.com/lib/init.js';
        script.async = true;
        script.onload = () => {
            if (window.PayonusGateway) {
                const configOptions: ConfigOptionsTypes = {
                    environment: 'live',
                    secretKey: 'sk_live_J9BBY7JAMVNAGRYQDLFXDPMA1PGI',
                    amount: 200,
                    email: 'dare@payonus.com',
                    name: 'SuperMall',
                    currency: 'NGN',
                    transactionRef: 'boiuafsd8o3bcqgef',
                    mobileNumber: '09077777777',
                    onSuccess: (payload) => console.log('Payment successful:', payload),
                    onFailure: (error) => console.log('Payment failed:', error),
                    onPending: (data) => console.log('Payment pending:', data),
                };

                const { openPopup, exitPopup } = window.PayonusGateway.create(configOptions);

                if(Boolean(open)) {
                    openPopup();
                }
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        if (window.PayonusGateway) {
            const { openPopup } = window.PayonusGateway.create({});
            openPopup();
        }
    };

    return (
        <div>
            <h1>PayOnUs Payment Integration</h1>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentPage;
