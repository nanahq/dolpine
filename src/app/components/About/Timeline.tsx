interface TimelineCardProps {
  title: string;
  items: string[];
}

const TimelineCard: React.FC<TimelineCardProps> = ({ title, items }) => (
  <div className="border border-gray-200 rounded-2xl p-8 flex flex-col gap-4 justify-start lg:max-w-[700px]">
    <h3 className="text-xl font-semibold lg:text-3xl">{title}</h3>
    <ul className="flex flex-col gap-2 mt-[20px] mb-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-2 items-start text-sm text-[#202125a3] lg:text-base lg:leading-6 dark:text-[#8d8d8d]"
        >
          <span>&#8226;</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

interface TimelineProps {
  timelineCards: TimelineCardProps[];
}

const Timeline: React.FC<TimelineProps> = ({ timelineCards }) => (
  <section className="mb-24 flex flex-col px-4 xl:max-[90rem]">
    <h2 className="mx-auto my-12  text-center text-3xl font-bold lg:text-5xl">
      How about the journey so far, how has it been?
    </h2>
    <div className="flex flex-col gap-4 justify-center items-center">
      {timelineCards.map((card, index) => (
        <TimelineCard key={index} title={card.title} items={card.items} />
      ))}
    </div>
  </section>
);


export default Timeline;
