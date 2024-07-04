import { QWrapper } from '../QWrapper'
import {selfAssesmentQuestions} from './dataQuestions'

let selfQ = selfAssesmentQuestions


export function QOne(){
 let copyInfo = selfQ.find((selfOne) => selfOne.id === 1)
const qOptions = copyInfo?.selections
qOptions?.forEach((item)=> {

  <div key={copyInfo?.id}>   
   <li>{item}</li>
   </div>



 })



  return(
<QWrapper title="Self Assesment">

<div key={copyInfo?.id}>
<div className='font-regular m-4 text-3xl text-stone-600'>

{copyInfo?.question}
</div>
<div className='font-light m-4 text-2xl text-stone-600'>

 <div key={copyInfo?.id}>   
 <li>{qOptions}</li> 
   </div>

</div>
</div>
</QWrapper>


  )
  }
