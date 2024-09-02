import { QWrapper } from '../../QWrapper'
import { selfAssesmentQuestions } from '../dataQuestions'
import { useState } from 'react'
let selfQ = selfAssesmentQuestions

export function QOne() {
  let introQ = selfQ.find((selfOne) => selfOne.id === 1)
  const qOptions = introQ?.selections;
  const [answer, setAnswer] = useState<number | null>(null);


  return (
    <QWrapper title="Introspective">

      <div key={introQ
        ?.id}>
        <div className='font-regular m-4 text-3xl text-stone-600'>

          {introQ?.question}
        </div>
        <div className='font-light m-4 text-1xl text-stone-600 '>
          <ul className='flex space-x-4'>
            {qOptions?.map((item, index) => {
              return (<li className={`
              inline-block border border-stone-600 p-2 rounded-lg 
              hover:bg-stone-600 hover:text-white cursor-pointer
              transition-colors duration-200
              ${answer === index ? 'bg-stone-600 text-white' : ''}
            `}
                onClick={() => setAnswer(index)} key={item}>{item}</li>
              )

            })}
          </ul>
        </div>
      </div>
    </QWrapper>


  )
}
