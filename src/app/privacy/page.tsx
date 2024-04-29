import Link from "next/link";

const Page = () => {
    return (
        <section className="mx-auto w-[80%] text-2xl flex flex-col space-y-10 my-20">
            <div className="flex flex-col">
                <h1 className="font-bold text-4xl uppercase">Privacy Policy</h1>
                <p className="text-lg mb-10">Last Updated: 23 December 2023</p>
                <p>
                    Nana is committed to ensuring the privacy and security of your
                    personal information. This Privacy Policy outlines the types of
                    information we collect, how we use and protect that information, and
                    your choices regarding the collection and use of your data.
                </p>
                <p>
                    By using Nana's mobile applications ("Apps"), you consent to the
                    practices described in this Privacy Policy.
                </p>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    Information We Collect
                </h2>
                <ol>
                    <li>
                        <strong>Personal Information:</strong> When you use Nana, we
                        collect personal information, such as your name, email address,
                        phone number, and delivery address. This information is necessary
                        for account creation, order processing and delivery.
                    </li>
                    <li>
                        <strong>Location Information:</strong> We collect your device's
                        location to provide accurate delivery estimates, find nearby
                        vendors, and enhance your overall experience. You have the option
                        to disable location services, but certain features may be limited.
                    </li>
                    <li>
                        <strong>Notification Permissions:</strong> Nana may request
                        permission permission to send you push notifications. These
                        notifications provide updates on your order status, promotions,
                        and other relevant information. You can manage your notification
                        preferences in your device settings.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> We collect information about your
                        interactions with the Apps, such as the pages you view, the
                        features you use, and the actions you take. This data helps us
                        improve our services and tailor our offerings to your preferences.
                    </li>
                </ol>
            </div>
            <div className="flex flex-col md:space-y-10">
                <h2 className="font-bold text-3xl mb-5 uppercase">
                    How We Use Your Information
                </h2>
                <p className="mb-5">
                    Nana uses the collected information for the following purposes:
                </p>
                <ol>
                    <li>1. To process and fulfill your orders.</li>
                    <li>
                        2. To provide location-based services, such as finding nearby
                        vendors.
                    </li>
                    <li>3. To send order updates and promotional notifications.</li>
                    <li>4. To analyze and improve our Apps and services.</li>
                    <li>5. To respond to customer inquiries and provide support.</li>
                </ol>
                <h2 className="font-bold font-bold text-3xl my-5 uppercase">
                    Data Security
                </h2>
                <p>
                    We prioritize the security of your information. We implement
                    industry-standard measures to protect against unauthorized access,
                    alteration, disclosure, or destruction of your personal data.
                </p>
                <h2 className="font-bold text-3xl my-5 uppercase">
                    Third-Party Services
                </h2>
                <p>
                    Nana may use third-party services, such as analytics and advertising
                    partners, to enhance our Apps and services. These third parties may
                    collect and use information in accordance with their own privacy
                    policies.
                </p>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold font-bold text-3xl mb-5 uppercase">
                    Your Choices
                </h2>
                <ul>
                    <li>
                        <strong>Location Services:</strong> You can control whether to
                        enable enable or disable location services for the Apps through
                        your device settings.
                    </li>
                    <li>
                        <strong>Notifications:</strong> You can manage your notification
                        preferences in your device settings.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold font-bold text-3xl mb-5 uppercase">
                    Updates to this Privacy Policy
                </h2>
                <p>
                    Nana reserves the right to update or modify this Privacy Policy at
                    any time. We encourage users to review this Privacy Policy
                    periodically for any changes. We will notify users of significant
                    changes through the Apps or other appropriate channels.
                </p>
                <p>
                    Your continued use of the Apps after the posting of any changes
                    constitutes acceptance of those changes. If you have any questions
                    about the updates or modifications, please contact us at{' '}
                    <a href="mailto:hello@trynanaapp.com">hello@trynanaapp.com</a>.
                </p>
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold font-bold text-3xl mb-5 uppercase">
                   Account Deletion Policy
                </h2>
                <p>
                    If you no longer wish to use Nana, you can request for your
                    information to be deleted. This is a permanent action and can not be
                    undone. All your information including order history, payment
                    history, personal information like email, name etc will be delete.
                    Please go to{' '}
                    <span className="underline text-nana-blue font-bold">
              <Link href='/delete'>this page</Link> to delete your information
            </span>
                </p>
            </div>
        </section>
    )
}

export default Page
