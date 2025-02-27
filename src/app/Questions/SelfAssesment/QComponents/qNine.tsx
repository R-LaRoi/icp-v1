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
      <div key={introQ9?.id}>
        <div className='font-regular mb-4 text-2xl text-blue-100'>
          {introQ9?.question}
        </div>
        <div className='font-light text-blue-100'>
          <ul className="space-y-2">
            {qOptions?.map((item) => {
              return (
                <li key={item}>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-100 rounded border-blue-100 focus:ring-blue-100 mt-1"
                      checked={answers.includes(item)}
                      onChange={() => handleAnswerChange(item)}
                    />
                    <span className="ml-2 text-sm">{item}</span>
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
