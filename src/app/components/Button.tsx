import Link from "next/link";

interface TextLinkProps {
    text: string;
    link: string;
}
const TextLink: React.FC<TextLinkProps> = ({ text, link }) => {
    return (
        <div className="flex lg:justify-center w-full last:mb-4 ">
            <Link
                target="_blank"
                href={link}
                className="text-nana-blue hover:text-nana-blue/85"
            >
                {text}
            </Link>
        </div>
    );
};

export type ButtonVariant = "default" | "link";
interface ButtonProps {
    text: string;
    link: string;
    variant: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({ text, link, variant }) => {
    switch (variant) {
        case "default":
            return (
                <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base cursor-pointer inline-flex bg-nana-blue hover:bg-nana-blue/85 text-white py-2 px-4 rounded-md capitalize duration-300 overflow-hidden text-ellipsis break-words dark:text-black transition-transform-gpu hover:scale-105"
                >
                    {text}
                </Link>
            );
            break;
        case "link":
            return <TextLink text={text} link={link} />;
            break;
    }
};
