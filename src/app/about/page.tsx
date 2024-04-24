import React from 'react';
import Hero from '../components/About/Hero';
import AboutCard from '../components/About/AboutCard';
import Timeline from '../components/About/Timeline';
import Paragraph from '../components/About/Paragraph';
import ImageBanner from '../components/About/ImageBanner';
import TestImage from '@/assets/place.jpg';
import TestImage2 from '@/assets/hero.jpg';
import ListParagraph from '../components/About/ListParagraph';

const timelineData = [
  {
    title: '2018: Nana was founded in Kano, Nigeria',
    items: [
      'Team of six with five focused on product development',
      'Our first office was a 10-square-meter space in central Helsinki where we all worked together in one room for the first 9 months of our existence.',
      'We decided the name of the company and filed all the paperwork. Wolt was the final name we were all able to agree on. One of our founders, Suraj, was browsing through a list of imaginary names and “Eat Later” ultimately turned into Nana. (Name contenders included amazing options like Blueberry Pie, Skyliner, Zaplane and Sergei).',
      'This was also the year of the Sochi Olympics.',
    ],
  },
  {
    title: '2018: Nana was founded in Kano, Nigeria',
    items: [
      'Team of six with five focused on product development',
      'Our first office was a 10-square-meter space in central Helsinki where we all worked together in one room for the first 9 months of our existence.',
      'We decided the name of the company and filed all the paperwork. Wolt was the final name we were all able to agree on. One of our founders, Suraj, was browsing through a list of imaginary names and “Eat Later” ultimately turned into Nana. (Name contenders included amazing options like Blueberry Pie, Skyliner, Zaplane and Sergei).',
      'This was also the year of the Sochi Olympics.',
    ],
  },
];

interface AboutProps {}
export default function About() {
  return (
    <main className="mx-auto mt-24 flex flex-col items-center w-full">
      <Hero
        image={TestImage}
        altText="About Image 1"
        description="Nana makes it incredibly easy for you to discover and get what you want. Delivered to you – quickly, reliably and affordably."
      />
      <AboutCard
        title="What is exactly is this Nana anyway?"
        description="Nana is the leading food delivery platform revolutionizing how consumers in underrepresented cities experience dining. With a seamless mobile app, we connect users to their favorite local restaurants, bringing convenience and delicious meals straight to their doorstep. As a child company of Imagyne Ventures, we benefit from the support and expertise of a seasoned high tech infrastructure, propelling us to new heights in the food delivery industry. To enable this, Wolt develops a wide range of technologies from local logistics to retail software and financial solutions, as well as operates its own grocery stores under the brand Wolt Market."
        image={TestImage2}
      />
      <AboutCard
        title="Companies usually have a “mission and vision”. What are ours?"
        description="At Nana, our mission is simple yet impactful: to empower communities in underrepresented cities by providing easy access to diverse culinary experiences. Through innovation and technology, we strive to bridge the gap between local restaurants and customers, fostering economic growth and culinary appreciation in every neighborhood we serve. Together, we're redefining the way people eat, one delivery at a time."
        image={TestImage2}
      />
      <ImageBanner src={TestImage} alt="team image" />
      <Timeline timelineCards={timelineData} />
      <ImageBanner src={TestImage} alt="team image" />
      <Paragraph />

      <AboutCard
        title="What operating sustainably and finding the right balance means for us?"
        image={TestImage}
        description={
          <ListParagraph
            lists={[
              'Employees – We’re committed to being a great company to work for. We treat each other fairly, we promote equal opportunities and encourage diversity. We take pride in what people of Wolt do not just during their time with the company, but also the impact they will create in their future endeavours after Wolt.',
              'Couriers – We’re committed to being a fair and sustainable platform. We treat our courier partners with respect. We always listen to feedback and regularly survey how our couriers are doing. We take pride in trying to increase earnings, introduce safety nets and remove hindrances as we continue growing and investing into making our products and technologies better.',
              "Merchants – We’re committed to being a long-term partner. Through our service,  we bring restaurants more orders, and we’re always helpful and responsive. We strive to find a long-term sustainable balance between our and the merchant's business in each of the cities we operate in.",
            ]}
            paragraph="We are committed to make the cities we operate in better places to live. We are also committed to do the right thing towards our teammates, partners, customers, and the general public. More concretely what that means:"
            className="lg:text-2xl"
          />
        }
      />
      <AboutCard
        image={TestImage}
        description={
          <ListParagraph
            lists={[
              'Customers – We’re committed to being a great service and we will do our best to keep our customers happy. We’re available and respond to customers as quickly as possible. We own our mistakes, are committed to improving over time and pushing for the best real-time customer support in the world.',
              'Society –  We’re committed to being a climate-conscious company, and we will continue to take more action to fight climate change. We push for platform work that is a complementary and long-term sustainable model of work that makes our societies better and have higher opportunity because of what we do.',
              "Investors - Wolt joined forces with DoorDash in 2022. Please see more about the company on DoorDash's investor relations website.",
            ]}
            className="p-0 [&>li]:pl-0"
          />
        }
      />
    </main>
  );
}
