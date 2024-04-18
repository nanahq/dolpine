import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page Title',
};

export default function Page() {
  return (
    <section className="flex flex-col justify-center items-center  w-full lg:max-w-[90rem] font-bold text-2xl px-4 lg:px-12 my-[7.5rem] lg:my-[10rem] mx-auto ">
      <h1>Hello World</h1>
    </section>
  );
}
