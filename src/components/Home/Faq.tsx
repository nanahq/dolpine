import React, { useState } from 'react';
import classNames from 'classnames';

export const QA: FaqQuestionI[] = [
  {
    question: 'What is Nana Delivery?',
    answer:
      'Nana is a food discovery and delivery platform that enables consumers to find and order food around them with ease',
    index: 1,
  },
  {
    question: 'How do addresses work?',
    answer:
      'Addresses are a crucial feature in Nana. Nana uses precise location provide correct delivery time estimates, delivery fee calculation and also send gifts to loved one. ',
    index: 2,
  },
  {
    question: 'How is delivery fee calculated?',
    answer:
      'We use distance and other factors like fuel per liter cost to calculate delivery fee. We understand the high cost of delivery and our mission is to provide our users with fair delivery fees. Our delivery is calculated based on this distance. The closer you are to a vendor, the less fee you pay. All delivery fees are capped at 600 NAIRA',
    index: 3,
  },
  {
    question: 'What is service fee?',
    answer:
      'Service fee is a small amount we charge you at checkout. This is calculated based on your subtotal excluding delivery fee.',
    index: 4,
  },
];

export const VendorQA: FaqQuestionI[] = [
  {
    question: 'How do i join Nana as a vendor?',
    answer:
      'Joing Nana as a vendor is easy and can be done in 3 steps. Download them Nana Vendors app, sign up and complete your profile, our representative will contact you with forms to sign and that is it.',
    index: 1,
  },
  {
    question: 'How are payments made?',
    answer:
      'Payments are made automatically the next day. For sales made today, payments will be made tomorrow before noon. ',
    index: 2,
  },
  {
    question: 'How do i onboard my existing customers to Nana?',
    answer:
      'Onboarding your existing customers is easy. Just spread the work about Nana and leave the rest to us',
    index: 3,
  },
];
export interface FaqQuestionI {
  question: string;
  answer: string;
  index: number;
}

export const FaqComponent: React.FC<{ qa: FaqQuestionI[] }> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState(props.qa[0]);

  const setQuestion = (question: FaqQuestionI): void => {
    setCurrentIndex(() => question.index);
    setCurrentAnswer(question);
  };

  return (
    <section
      id="faq"
      className="bg-black h-[500px] relative mt-[20rem] rounded-[20px]"
    >
      <div className="flex flex-row items-center justify-center">
        <div className="border-2 bg-white w-full lg:w-[1000px] md:h-[500px]  border-black absolute -top-[10rem] text-white rounded-[20px]">
          <div className="p-8 flex flex-col-reverse md:flex-row flex-1 items-baseline ">
            <div className="flex flex-col mt-10 md:mt-0 w-full md:w-1/2 h-full">
              <div>
                <h1 className="font-bold text-2xl md:text-4xl mb-3 text-black">
                  FAQs
                </h1>
              </div>
              <div className="flex flex-col items-start">
                {props.qa.map((qa) => (
                  <QuestionButton
                    key={qa.index}
                    question={qa}
                    currentIndex={currentIndex}
                    onClick={setQuestion}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full mt-10 md:mt-0  md:w-1/2 items-start justify-start h-full">
              <div>
                <h1 className="font-bold mb-2 text-2xl md:text-4xl text-black">
                  Answers
                </h1>
              </div>
              <div className="bg-black overflow-hidden flex-grow p-6 rounded-[20px]">
                <p className="break-words text-white text-lg">
                  {currentAnswer.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const QuestionButton: React.FC<{
  question: FaqQuestionI;
  currentIndex: number;
  onClick: (index: FaqQuestionI) => void;
}> = (props) => {
  return (
    <button
      className={classNames(
        'py-4 px-8 my-2 w-full flex flex-row md:w-[300px] flex flex-row items-center justify-center font-bold rounded-[5px]',
        {
          'bg-nana-blue text-white':
            props.question.index === props.currentIndex,
          'bg-nana-blue/20 text-black':
            props.question.index !== props.currentIndex,
        },
      )}
      onClick={() => props.onClick(props.question)}
    >
      {props.question.question}
    </button>
  );
};
