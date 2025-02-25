import { QWrapper } from '../../QWrapper'
import { selfAssesmentQuestions } from '../dataQuestions'
import { useState, useEffect } from 'react';

let selfQ = selfAssesmentQuestions

export function QNine({ answerChecked }: { answerChecked: (answers: string[]) => void }) {

  let introQ9 = selfQ.find((selfOne) => selfOne.id === 9)
  const qOptions = introQ9?.selections;
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswerChange = (item: string) => {
    setAnswers(prev => {
      if (prev.includes(item)) {
        return prev.filter(a => a !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  useEffect(() => {
    answerChecked(answers);
  }, [answers]);



  return (
    <QWrapper title="Introspective">

      <div key={introQ9
        ?.id}>
        <div className='font-regular m-4 text-3xl text-stone-600'>

          {introQ9?.question}
        </div>
        <div className='font-light m-4 text-2xl text-stone-600'>
          <ul>
            {qOptions?.map((item,) => {
              return (
                <li key={item}>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-stone-600 rounded border-stone-600 focus:ring-stone-600 mr-2"
                      checked={answers.includes(item)}
                      onChange={() => handleAnswerChange(item)}
                    >
                    </input>
                    {item}
                  </label>
                </li>
              )

            })}
          </ul>
        </div>
      </div>
    </QWrapper>


  )
}
