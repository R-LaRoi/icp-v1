import {selfAssesmentQuestions} from './dataQuestions'

let selfQ = selfAssesmentQuestions

export function QOne(){
 let copyInfo = selfQ.find((selfOne) => selfOne.id === 1)
  return(
<div>
<div>

{copyInfo?.question}
</div>
{copyInfo?.selections}

</div>



  )

}