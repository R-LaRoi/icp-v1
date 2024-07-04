import { QWrapper } from '../QWrapper'
import {selfAssesmentQuestions} from './dataQuestions'

let selfQ = selfAssesmentQuestions

export function QNine(){
let introQ9 = selfQ.find((selfOne) => selfOne.id === 9)
const qOptions = introQ9?.selections;



  return(
<QWrapper title="Introspective">
 
<div key={introQ9
?.id}>
<div className='font-regular m-4 text-3xl text-stone-600'>

{introQ9?.question}
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
