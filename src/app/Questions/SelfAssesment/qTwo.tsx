import {selfAssesmentQuestions} from './dataQuestions'

let selfQ = selfAssesmentQuestions

export function QTwo(){
 let copyInfo = selfQ.find((selfOne) => selfOne.id === 2)
  return(
<div>
<div>

{copyInfo?.question}
</div>
{copyInfo?.selections}

</div>



  )

}