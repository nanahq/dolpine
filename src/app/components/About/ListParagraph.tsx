import classNames from 'classnames';

interface ListParagraphProps {
  lists: string[];
  paragraph?: string;
  className?: string;
}

const ListParagraph: React.FC<ListParagraphProps> = ({
  lists,
  paragraph,
  className,
}) => {
  return (
    <div
      className={classNames(
        'p-8 md:p-0  flex flex-col gap-4 justify-start lg:max-w-4xl',
        className,
      )}
    >
      <p className="text-sm lg:leading-6 dark:text-[#8d8d8d]">{paragraph}</p>
      <ul className="flex flex-col gap-2 mt-[20px] mb-4">
        {lists.map((list, index) => (
          <li
            key={index}
            className="flex gap-2 items-start text-sm lg:leading-6 dark:text-[#8d8d8d] pl-8"
          >
            <span>&#8226;</span> {list}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListParagraph;