import Link from "next/link";

const Page = () => {
    return (
        <section className="mx-auto w-[80%] text-2xl flex flex-col space-y-10 my-20">
            <div className="flex flex-col">
                <h1 className="font-bold text-4xl uppercase"> Terms of Usage</h1>
                <p className="text-lg">Effective Date: December 20, 2023</p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    1. Acceptance of Terms
                </h2>
                <p>
                    By accessing or using the Nana Delivery platform, including our
                    website and mobile application, you agree to be bound by these Terms
                    of Usage. If you do not agree to these terms, you may not use our
                    services.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">2. Definitions</h2>
                <ol>
                    <li>
                        <strong>"Nana Delivery," "we," "us," or "our"</strong> refers to
                        Nana Delivery, a food delivery platform operating in Nigeria.
                    </li>
                    <li>
                        <strong>"You" or "user"</strong> refers to any individual or
                        entity entity using our platform.
                    </li>
                    <li>
                        <strong>"Platform"</strong> refers to our website, mobile
                        application, and other related services.
                    </li>
                    <li>
                        <strong>"Vendors"</strong> refers to restaurants and homemade
                        chefs chefs who provide food through our platform.
                    </li>
                    <li>
                        <strong>"Orders"</strong> refers to food and beverage orders
                        placed through our platform.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">3. Services</h2>
                <p>
                    Nana Delivery provides a platform for users to discover, order, and
                    have food delivered from participating vendors. Our services
                    include:
                </p>
                <ul>
                    <li>Listing of vendors and their menus.</li>
                    <li>Order placement and payment processing.</li>
                    <li>Delivery of orders to users.</li>
                    <li>Customer support and dispute resolution.</li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    4. User Eligibility
                </h2>
                <p>To use our services, you must:</p>
                <ul>
                    <li>Be at least 15 years old.</li>
                    <li>Create an account with accurate information.</li>
                    <li>Have a valid payment method.</li>
                    <li>Be located within our service areas.</li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    5. Account Creation and Security
                </h2>
                <p>
                    You are responsible for maintaining the confidentiality of your
                    account information and password. You are also responsible for any
                    activity that occurs under your account.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    6. Orders and Payments
                </h2>
                <ul>
                    <li>
                        You agree to pay all fees associated with your orders, including
                        food, delivery, and other applicable charges.
                    </li>
                    <li>
                        We only accept online payment via a third party payment processor
                    </li>
                    <li>
                        You are responsible for ensuring the accuracy of your order
                        details.
                    </li>
                    <li>
                        We may cancel orders for reasons such as vendor unavailability,
                        incorrect order details, or payment issues.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">7. Delivery</h2>
                <ul>
                    <li>
                        We strive to deliver orders within the estimated timeframes, but
                        we cannot guarantee delivery times due to factors beyond our
                        control.
                    </li>
                    <li>You are responsible for providing a valid delivery address.</li>
                    <li>You must be available to receive the order upon delivery.</li>
                    <li>
                        We may refuse to deliver to certain areas or under certain
                        conditions.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    8. Cancellations and Refunds
                </h2>
                <ul>
                    <li>
                        You may cancel orders within a reasonable time before preparation
                        begins.
                    </li>
                    <li>
                        Refunds may be issued for canceled orders or in cases of quality
                        issues, subject to our refund policy.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">9. Disputes</h2>
                <p>
                    We aim to resolve any disputes between users and vendors amicably.
                    If a dispute cannot be resolved, you may contact us for assistance.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    10. Content and Intellectual Property
                </h2>
                <ul>
                    <li>
                        All content on our platform, including text, images, logos, and
                        software, is protected by intellectual property laws.
                    </li>
                    <li>
                        You may not copy, reproduce, distribute, or modify any content
                        without our express permission.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    11. Third-Party Links
                </h2>
                <p>
                    Our platform may contain links to third-party websites or services.
                    We are not responsible for the content or practices of those third
                    parties.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    12. Privacy Policy
                </h2>
                <p>
                    Please refer to our <Link href="/privacy">Privacy Policy</Link> for
                    information on how we collect, use, and protect your personal
                    information.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    13. Disclaimer of Warranties
                </h2>
                <p>
                    Our services are provided "as is" and without warranties of any
                    kind, express or implied. We do not guarantee the accuracy,
                    completeness, or timeliness of information on our platform.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    14. Limitation of Liability
                </h2>
                <p>
                    We shall not be liable for any direct, indirect, incidental,
                    consequential, or punitive damages arising from your use of our
                    services.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    15. Indemnification
                </h2>
                <p>
                    You agree to indemnify and hold us harmless from any claims, losses,
                    damages, or costs arising from your use of our services or violation
                    of these terms.
                </p>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    16. Governing Law and Jurisdiction
                </h2>
                <p>
                    These terms shall be governed by and construed in accordance with
                    the laws of Nigeria. Any disputes arising out of these terms shall
                    be subject to the exclusive jurisdiction of the courts in Nigeria.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    17. Changes to Terms
                </h2>
                <p>
                    We may modify these terms at any time by posting the updated terms
                    on our platform. Your continued use of our services after any
                    changes constitutes your acceptance of the updated terms.
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">18. Contact Us</h2>
                <p>
                    If you have any questions or concerns about these terms, please
                    contact us at{' '}
                    <a href="mailto:contact@trynanaapp.com">hello@trynanaapp.com</a>
                </p>
            </div>
        </section>
    )
}

export default Page
