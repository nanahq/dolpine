import Link from "next/link";

const APPS = [
    { name: "Nana", audience: "for customers ordering food, groceries and deliveries", id: "com.nanaeats.nana_app" },
    { name: "Nana Vendor", audience: "for restaurants and stores selling on Nana", id: "com.nanaeats.nana_vendors" },
    { name: "Nana Rider", audience: "for riders who carry out deliveries", id: "com.nanaeats.nana_rider" },
];

const Page = () => {
    return (
        <section className="mx-auto w-[80%] text-2xl flex flex-col space-y-10 my-20">
            <div className="flex flex-col space-y-5">
                <h1 className="font-bold text-4xl uppercase">Privacy Policy</h1>
                <p className="text-lg">Last updated: 24 September 2026</p>
                <p>
                    This Privacy Policy explains how <strong>Nana Logistics</strong> (&quot;Nana&quot;,
                    &quot;we&quot;, &quot;us&quot;) collects, uses, shares and protects personal
                    information. Nana Logistics is the developer of the Nana apps listed below on
                    Google Play and the Apple App Store, and is responsible for the personal
                    information they collect.
                </p>
                <p>This policy applies to:</p>
                <ul className="list-disc pl-8 space-y-2">
                    {APPS.map((app) => (
                        <li key={app.id}>
                            <strong>{app.name}</strong> — {app.audience} (Android package{" "}
                            <code className="text-xl">{app.id}</code>)
                        </li>
                    ))}
                    <li>
                        Our website, <strong>trynanaapp.com</strong>
                    </li>
                </ul>
                <p>
                    By using any of these apps or the website, you agree to the practices described
                    in this policy.
                </p>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">1. Information We Collect</h2>

                <h3 className="font-bold text-2xl">All Nana apps</h3>
                <ul className="list-disc pl-8 space-y-2">
                    <li>
                        <strong>Account information:</strong> your name, phone number, email address
                        and login details.
                    </li>
                    <li>
                        <strong>Device and notification information:</strong> a push notification
                        token, device type and operating system, so we can send order and account
                        notifications.
                    </li>
                    <li>
                        <strong>Usage information:</strong> how you use the app, such as the screens
                        you open and the actions you take, and crash and performance data.
                    </li>
                </ul>

                <h3 className="font-bold text-2xl">Nana (customer app)</h3>
                <ul className="list-disc pl-8 space-y-2">
                    <li>
                        <strong>Location:</strong> your device&apos;s precise location while you are
                        using the app, to show nearby stores, price deliveries and set delivery
                        addresses. You can turn this off in your device settings and enter an
                        address instead.
                    </li>
                    <li>
                        <strong>Delivery addresses and contacts:</strong> the addresses you save, and
                        the name and phone number of anyone you send a gift or delivery to.
                    </li>
                    <li>
                        <strong>Orders and payments:</strong> what you order, order history, wallet
                        balance and payment records. Card payments are handled by our payment
                        providers; we do not store your full card number.
                    </li>
                    <li>
                        <strong>Advertising identifier:</strong> your device&apos;s advertising ID, used
                        to measure which campaigns bring people to Nana. You can reset or limit it in
                        your device settings.
                    </li>
                </ul>

                <h3 className="font-bold text-2xl">Nana Vendor (store app)</h3>
                <ul className="list-disc pl-8 space-y-2">
                    <li>
                        <strong>Business information:</strong> your store&apos;s name, description,
                        address, phone number, email, opening hours and the people you give access to
                        the store.
                    </li>
                    <li>
                        <strong>Location:</strong> your device&apos;s location, only when you set or
                        update your store&apos;s pickup location.
                    </li>
                    <li>
                        <strong>Photos and camera:</strong> photos you take or choose from your
                        library for your products and store, only when you choose to upload one.
                    </li>
                    <li>
                        <strong>Payout information:</strong> the bank account details your earnings are
                        paid into.
                    </li>
                    <li>
                        <strong>Orders and deliveries:</strong> the orders your store receives,
                        including the customer details needed to prepare them, and the recipient phone
                        number and drop-off address of any delivery you send through the app.
                    </li>
                </ul>

                <h3 className="font-bold text-2xl">Nana Rider (rider app)</h3>
                <ul className="list-disc pl-8 space-y-2">
                    <li>
                        <strong>Location:</strong> your device&apos;s precise location while you are
                        online, to offer you nearby deliveries and show customers and stores where
                        their order is.
                    </li>
                    <li>
                        <strong>Delivery and earnings information:</strong> the deliveries you accept
                        and complete, your earnings, and the bank account your earnings are paid into.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">2. How We Use Your Information</h2>
                <ol className="list-decimal pl-8 space-y-2">
                    <li>To create and manage your account.</li>
                    <li>To place, prepare, deliver and track orders and deliveries.</li>
                    <li>To process payments, refunds and payouts.</li>
                    <li>
                        To send notifications about orders, deliveries and your account, and — if you
                        allow it — offers and promotions.
                    </li>
                    <li>To provide customer, store and rider support.</li>
                    <li>To prevent fraud and keep the platform safe.</li>
                    <li>To understand how the apps are used and improve them.</li>
                    <li>To meet our legal and tax obligations.</li>
                </ol>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">3. How We Share Your Information</h2>
                <p>We do not sell your personal information. We share it only as follows:</p>
                <ul className="list-disc pl-8 space-y-2">
                    <li>
                        <strong>To complete an order:</strong> the store preparing an order and the
                        rider delivering it receive the details they need, such as the items, a name,
                        phone number and delivery address. Customers see the name and location of the
                        rider carrying their order.
                    </li>
                    <li>
                        <strong>With service providers</strong> who work on our behalf: payment
                        processing (Paystack, Flutterwave), maps and address search (Google Maps
                        Platform), push notifications (OneSignal), hosting and storage (Amazon Web
                        Services, DigitalOcean, Supabase), analytics (Amplitude), and email, SMS and
                        WhatsApp messages (Resend, Customer.io, Twilio, WhatsApp). They may only use
                        your information to provide their service to us.
                    </li>
                    <li>
                        <strong>When required by law</strong>, or to protect the rights, safety and
                        property of our users or of Nana Logistics.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">4. Data Security and Retention</h2>
                <p>
                    We use industry-standard measures, including encryption in transit, to protect
                    your information against unauthorised access, alteration, disclosure or
                    destruction. We keep your information for as long as your account is active and
                    afterwards only as long as we need it for legal, tax, accounting or dispute
                    purposes.
                </p>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">5. Your Choices and Rights</h2>
                <ul className="list-disc pl-8 space-y-2">
                    <li>
                        <strong>Location, camera and photos:</strong> you can allow or deny access at
                        any time in your device settings. Some features may not work without it.
                    </li>
                    <li>
                        <strong>Notifications:</strong> you can turn them off in your device settings.
                    </li>
                    <li>
                        <strong>Access, correction and deletion:</strong> under the Nigeria Data
                        Protection Act 2023 you can ask us for a copy of your information, ask us to
                        correct it, or ask us to delete it.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">6. Deleting Your Account</h2>
                <p>
                    You can ask us to delete your Nana, Nana Vendor or Nana Rider account and
                    personal information at any time. See{" "}
                    <Link href="/delete" className="underline text-nana-blue font-bold">
                        how to delete your account
                    </Link>
                    , or email us at suraj@trynanaapp.com with the phone number on your account. We
                    confirm the request comes from you, then delete the account within 30 days.
                    Deletion is permanent. We keep records we are legally required to keep, such as
                    payment and tax records.
                </p>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">7. Children</h2>
                <p>
                    Our apps are not intended for anyone under 18, and we do not knowingly collect
                    information from children.
                </p>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">8. Changes to This Policy</h2>
                <p>
                    We may update this policy from time to time. We will change the date at the top
                    and, for significant changes, tell you in the apps or by another appropriate
                    channel.
                </p>
            </div>

            <div className="flex flex-col space-y-5">
                <h2 className="font-bold text-3xl uppercase">9. Contact Us</h2>
                <p>
                    Nana Logistics
                    <br />
                    Suite 60, MYCA7 Plaza, Kano, Nigeria
                    <br />
                    Email: <a className="underline" href="mailto:suraj@trynanaapp.com">suraj@trynanaapp.com</a>
                </p>
            </div>
        </section>
    );
};

export default Page;
