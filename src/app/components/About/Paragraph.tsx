import Image from 'next/image';
import ListParagraph from './ListParagraph';
import TestImage from '@/assets/test-hero.avif';

interface ParagraphSectionProps {}

const ParagraphSection: React.FC<ParagraphSectionProps> = ({}) => (
  <section className="mb-24 flex flex-col px-4 xl:max-[90rem]">
    <h2 className="mx-auto my-12  text-center text-3xl font-bold lg:text-5xl">
      So, yet another food delivery company?
    </h2>
    <div className="flex flex-col gap-4 justify-center items-center">
      <ListParagraph
        lists={[
          'Technology – real-time traveling salesman optimisation with as many moving pieces, hungry customers and busy restaurants as we have is a genuinely difficult mathematical problem to solve, not even talking about how to balance real-time delivery estimates, traffic situations, order volumes and human behaviour in a way that get the customer’s order delivery as quickly and precisely as possible, while actually making it worthwhile for all the counterparties in the equation. While this is something that we still constantly work on, our average delivery time remains at 30-35 minutes, and we’re always looking to do better.',
          'Efficiency – our local country teams run the show in each of the markets we operate in, while we operate in relatively small countries and always with real-time customer support in local language. This means that we’ve had to become especially good in being able to productize and automate everything to the extent that it’s possible to have local teams in countries as small as one million people, and still get the numbers to work. This allows us to operate sustainably in cities as small as 10 000 people living in our delivery area.',
          'Customer experience – ultimately we have no license to operate if we do not serve the customer in a brilliant, affordable way end-to-end: from app design and marketing to our real-time customer service, we do our best for you to be happy with us. And if something goes wrong, we genuinely want to fix it. That’s why we have local customer support in all the countries we’re in: real humans answering customers and partners in their own language in under 1 minute on average. ',
        ]}
        paragraph=" All in all, these mean that our home market of the Nordics was one of the toughest places in the world to find a sustainable balance between our customers, restaurants and courier partners, as well as with ourselves as a company. Ultimately, this has meant that we’ve had to figure out ways how to get there differently from others:"
      />
      <div className="max-w-[750px]">
        <Image
          src={TestImage}
          alt="mascot Image"
          className="object-cover h-full w-full my-8"
          width={0}
          height={0}
        />
      </div>
      <ListParagraph
        lists={[
          'Low density – Helsinki has a population of about 630 000 people, who are spread out across 213,8km2. That means there’s on average 2946 people on each square kilometer. (As a comparison, in Paris there’s about 20 370 people per square kilometer.) So we are a few and we are far apart. This means that we’ll never quite get the volume nor density that makes the food delivery problem much easier to solve with a high level of efficiency. Meanwhile, the smallest cities we operate in today have as few as 10 000 people living in our delivery area.',
          'We don’t really have a strong takeaway culture nor is delivery a very everyday thing in our Northern home region. For context, most restaurants that offer delivery themselves as a service often trade in pizza or kebab. This was not a very fruitful ground to build a completely new delivery experience on top of.',
          'Lowest income disparity in the world along with very high labour costs for any type of work. This combined with high price sensitivity means that our delivery fee and commission revenue are going to be relatively lower than virtually any other markets in the world compared to how much we need to be able to get to as courier earnings on an hourly basis (to cover not just the earnings but also all associated delivery cost, pensions and such).,',
        ]}
        paragraph="Actually not quite. Wolt got started on the far edge of the Scandinavian Peninsula, in the relatively small and spread out city of Helsinki. While Finland is a great country to live in, food delivery was an especially tough nut to crack in our Nordic home region:"
      />
    </div>
  </section>
);

export default ParagraphSection;
