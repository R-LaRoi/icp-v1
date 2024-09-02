import { QWrapper } from '../../QWrapper'
import { selfAssesmentQuestions } from '../dataQuestions'

let selfQ = selfAssesmentQuestions

export function QOne() {
  let introQ = selfQ.find((selfOne) => selfOne.id === 1)
  const qOptions = introQ?.selections;



  return (
    <QWrapper title="Introspective">

      <div key={introQ
        ?.id}>
        <div className='font-regular m-4 text-3xl text-stone-600'>

          {introQ?.question}
        </div>
        <div className='font-light m-4 text-1xl text-stone-600 '>
          <ul className='flex space-x-4'>
            {qOptions?.map((item,) => {
              return (<li className=' inline-block border border-stone-600 p-2 rounded-lg hover:bg-stone-600 hover:text-white' key={item}>{item}</li>
              )

            })}
          </ul>
        </div>
      </div>
    </QWrapper>


  )
}
