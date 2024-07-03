import {selfAssesmentQuestions} from './dataQuestions'

let selfQ = selfAssesmentQuestions

export function QOne(){
 let copyInfo = selfQ.find((selfOne) => selfOne.id === 1)
  return(
<div key={copyInfo?.id}>
<div className='font-regular m-4 text-3xl text-stone-600'>

{copyInfo?.question}
</div>
<div className='font-light m-4 text-2xl text-stone-600'>
{copyInfo?.selections}
</div>
</div>



  )

}