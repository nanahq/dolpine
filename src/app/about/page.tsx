import React from 'react';
import Hero from '../components/About/Hero';
import AboutCard from '../components/About/AboutCard';
import Timeline from '../components/About/Timeline';
import Paragraph from '../components/About/Paragraph';
import ImageBanner from '../components/About/ImageBanner';
import AboutPageHero from '@/assets/About-page.jpg';
import AboutImage1 from '@/assets/About-Image-1.jpg';
import AboutImage2 from '@/assets/About-Image-2.jpg';

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

export default function About() {
  return (
    <main className="mx-auto mt-24 flex flex-col items-center w-full">
      <Hero
        image={AboutPageHero}
        altText="Nana Food deliver | Kano"
        description="Nana makes it incredibly easy for you to discover and get what you want. Delivered to you – quickly, reliably and affordably. Our mission is to bring reliability of delivery to underrepresented cities in Africa"
      />
      <AboutCard
        title="So, What is Nana?"
        description="Founded in Kano, Nigeria, Nana is a leading food and grocery delivery platform revolutionizing how consumers in underrepresented cities in Africa experience delivery. With a seamless mobile app, we connect users to their favorite local restaurants, stores and malls, bringing convenience straight to their doorstep. As a child company of Imagyne Ventures, we benefit from the support and expertise of a seasoned high tech infrastructure, propelling us to new heights in the delivery industry."
        image={AboutImage1}
      />
      <AboutCard
        title="Our mission"
        description="Nana is on a transformative mission to revolutionize the food delivery landscape in Africa. Our platform aims to change the status quo by offering swift and reliable delivery from a diverse array of local homemade vendors and restaurants, bringing delightful flavors and convenience to our users' doorsteps. With a strong focus on user satisfaction, technological innovation, and fostering local partnerships, Nana is poised to create a seamless, customer-centric experience that empowers local businesses while meeting the growing demand for efficient, on-demand food delivery in the region. As we continue to leverage emerging technologies and scale our operations, Nana is committed to becoming the leading food delivery platform in Africa, driving economic growth, and bringing smiles to millions of hungry customers across the continent."
        image={AboutImage2}
      />
      <ImageBanner src={AboutPageHero} alt="team image" />
      {/*<Timeline timelineCards={timelineData} />*/}
      {/*<ImageBanner src={AboutPageHero} alt="team image" />*/}
      {/*<Paragraph />*/}

      {/*<AboutCard*/}
      {/*  title="What operating sustainably and finding the right balance means for us?"*/}
      {/*  image={AboutPageHero}*/}
      {/*  description={*/}
      {/*    <ListParagraph*/}
      {/*      lists={[*/}
      {/*        'Employees – We’re committed to being a great company to work for. We treat each other fairly, we promote equal opportunities and encourage diversity. We take pride in what people of Wolt do not just during their time with the company, but also the impact they will create in their future endeavours after Wolt.',*/}
      {/*        'Couriers – We’re committed to being a fair and sustainable platform. We treat our courier partners with respect. We always listen to feedback and regularly survey how our couriers are doing. We take pride in trying to increase earnings, introduce safety nets and remove hindrances as we continue growing and investing into making our products and technologies better.',*/}
      {/*        "Merchants – We’re committed to being a long-term partner. Through our service,  we bring restaurants more orders, and we’re always helpful and responsive. We strive to find a long-term sustainable balance between our and the merchant's business in each of the cities we operate in.",*/}
      {/*      ]}*/}
      {/*      paragraph="We are committed to make the cities we operate in better places to live. We are also committed to do the right thing towards our teammates, partners, customers, and the general public. More concretely what that means:"*/}
      {/*      className="lg:text-2xl"*/}
      {/*    />*/}
      {/*  }*/}
      {/*/>*/}
      {/*<AboutCard*/}
      {/*  image={AboutPageHero}*/}
      {/*  description={*/}
      {/*    <ListParagraph*/}
      {/*      lists={[*/}
      {/*        'Customers – We’re committed to being a great service and we will do our best to keep our customers happy. We’re available and respond to customers as quickly as possible. We own our mistakes, are committed to improving over time and pushing for the best real-time customer support in the world.',*/}
      {/*        'Society –  We’re committed to being a climate-conscious company, and we will continue to take more action to fight climate change. We push for platform work that is a complementary and long-term sustainable model of work that makes our societies better and have higher opportunity because of what we do.',*/}
      {/*        "Investors - Wolt joined forces with DoorDash in 2022. Please see more about the company on DoorDash's investor relations website.",*/}
      {/*      ]}*/}
      {/*      className="p-0 [&>li]:pl-0"*/}
      {/*    />*/}
      {/*  }*/}
      {/*/>*/}
    </main>
  );
}
