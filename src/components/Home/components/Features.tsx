export const Feature: React.FC<{ feature: string }> = (props) => {
  return (
    <div className="w-[20rem] rounded-[5px] bg-gray-200/40  p-3 flex flex-row items-center justify-center">
      <p className="text-white text-lg">{props.feature}</p>
    </div>
  );
};
