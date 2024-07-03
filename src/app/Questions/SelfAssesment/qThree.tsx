import {selfAssesmentQuestions} from './dataQuestions'

let selfQ = selfAssesmentQuestions

export function QThree(){
 let copyInfo = selfQ.find((selfOne) => selfOne.id === 3)
  return(
<div>
<div>

{copyInfo?.question}
</div>
{copyInfo?.selections}

</div>



  )

}