const DELETION_EMAIL = "suraj@trynanaapp.com";

const mailto = (app: string) =>
    `mailto:${DELETION_EMAIL}?subject=${encodeURIComponent(`Delete my ${app} account`)}&body=${encodeURIComponent(
        `Please delete my ${app} account.\n\nPhone number on the account:\nName on the account:\n`,
    )}`;

/**
 * Account deletion requests for the Nana, Nana Vendor and Nana Rider apps (Nana Logistics).
 * Requests are handled by email: deleting an account has to be tied to the person who
 * owns it, and the email reply is how we confirm that before anything is removed.
 */
const DeletePage = () => {
    return (
        <section className="mx-auto w-[90%] max-w-[720px] text-xl flex flex-col space-y-8 my-20">
            <div className="flex flex-col space-y-3">
                <h1 className="font-bold text-4xl">Delete your Nana account</h1>
                <p>
                    You can ask Nana Logistics to delete your account and personal information for
                    any of our apps: <strong>Nana</strong>, <strong>Nana Vendor</strong> or{" "}
                    <strong>Nana Rider</strong>.
                </p>
            </div>

            <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-2xl">How to request deletion</h2>
                <ol className="list-decimal pl-8 space-y-2">
                    <li>
                        Email <a className="underline text-nana-blue font-bold" href={mailto("Nana")}>{DELETION_EMAIL}</a>{" "}
                        with the subject &quot;Delete my account&quot;, the app you use, and the phone
                        number on your account.
                    </li>
                    <li>We reply to confirm the request comes from the account owner.</li>
                    <li>Your account is deleted within 30 days of that confirmation, and we email you when it&apos;s done.</li>
                </ol>
                <div className="flex flex-wrap gap-3 pt-2">
                    <a className="rounded-lg bg-nana-blue px-4 py-2 text-white font-bold text-lg" href={mailto("Nana")}>
                        Delete my Nana account
                    </a>
                    <a className="rounded-lg bg-nana-blue px-4 py-2 text-white font-bold text-lg" href={mailto("Nana Vendor")}>
                        Delete my Nana Vendor account
                    </a>
                    <a className="rounded-lg bg-nana-blue px-4 py-2 text-white font-bold text-lg" href={mailto("Nana Rider")}>
                        Delete my Nana Rider account
                    </a>
                </div>
            </div>

            <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-2xl">What is deleted</h2>
                <p>
                    Your profile (name, phone number, email), saved addresses, notification settings
                    and login details. For store and rider accounts, your store or rider profile and
                    the bank details used for payouts.
                </p>
            </div>

            <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-2xl">What we keep</h2>
                <p>
                    Records we are required by law to keep, such as payment, payout and tax records,
                    for up to 6 years. They are no longer linked to an active account.
                </p>
            </div>
        </section>
    );
};

export default DeletePage;
