import {selfAssesmentQuestions} from './dataQuestions'

let selfQ = selfAssesmentQuestions

export function QTwo(){
 let copyInfo = selfQ.find((selfOne) => selfOne.id === 2)
  return(
<div>
<div className='font-regular m-4 text-3xl text-stone-600'>

{copyInfo?.question}
</div>
<div className='font-light m-4 text-2xl text-stone-600'>
{copyInfo?.selections}
</div>
</div>



  )

}