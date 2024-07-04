import {selfAssesmentQuestions} from './dataQuestions'
import { QWrapper } from '../QWrapper'
let selfQ = selfAssesmentQuestions

type UserTextData = {
  wkExp_values : string
}

type QFourProps = UserTextData & {
  updateTextArea: (textArea: Partial<UserTextData> ) => void
}

export function QFour({wkExp_values, updateTextArea}: QFourProps){
 
  let copyInfo = selfQ.find((selfOne) => selfOne.id === 4)
  return(

<QWrapper title="Introspective">
<div key={copyInfo?.id}>
<div className='font-regular m-4 text-3xl text-stone-600'>

{copyInfo?.question}
</div>
<div className='font-light m-4 text-2xl text-stone-600'>
{copyInfo?.selections}
</div>
<div className="relative w-full min-w-[200px]">
    <textarea
    name="wkExp_values"
    value={wkExp_values}
    onChange={e => updateTextArea({wkExp_values: e.target.value})}
      className="peer h-full min-h-[100px] w-75 resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
       required>
    </textarea>
    <label
      className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
Valuable Experience
    </label>
  </div>
</div>

</QWrapper>

  )

}