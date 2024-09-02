import { QWrapper } from '../../QWrapper'
import { selfAssesmentQuestions } from '../dataQuestions'

let selfQ = selfAssesmentQuestions

export function QNine() {
  let introQ9 = selfQ.find((selfOne) => selfOne.id === 9)
  const qOptions = introQ9?.selections;



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
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-stone-600 rounded border-stone-600 focus:ring-stone-600 mr-2">
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
