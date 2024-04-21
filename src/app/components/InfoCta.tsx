import { Button } from './Button';

interface InfoCtaProps {
  title: string;
  description: string;
}

const InfoCta: React.FC<InfoCtaProps> = ({ title, description }) => {
  return (
    <section className="flex flex-col justify-center items-center w-full lg:max-w-[90rem] lg:px-12min-w-full mb-[7.5rem] lg:mb-[10rem] px-4 pt-4 mx-auto">
      <div className="flex w-full flex-col items-center gap-6 lg:gap-8 ">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-5xl text-center">
          {title}
        </h2>
        <p className="text-sm md:text-base leading-6 text-[#202125a3] lg:text-xl text-center md:mx-8 lg:mx-44  ">
          {description}
        </p>
      </div>
    </section>
  );
};

export default InfoCta;
