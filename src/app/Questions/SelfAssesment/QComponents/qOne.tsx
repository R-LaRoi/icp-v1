import { QWrapper } from '../../QWrapper'
import {selfAssesmentQuestions} from '../dataQuestions'

let selfQ = selfAssesmentQuestions

export function QOne(){
let introQ = selfQ.find((selfOne) => selfOne.id === 1)
const qOptions = introQ?.selections;



  return(
<QWrapper title="Introspective">
 
<div key={introQ
?.id}>
<div className='font-regular m-4 text-3xl text-stone-600'>

{introQ?.question}
</div>
<div className='font-light m-4 text-2xl text-stone-600'>
<ul>
   {qOptions?.map((item,)=> {
  return (<li key={item}>{item}</li> 
  )

 })} 
</ul>
</div>
</div>
</QWrapper>


  )
  }
