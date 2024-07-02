'use client'
import React from 'react'
import { selfAssesmentQ } from './BtnQue';


 function showSelfAssesment() {


const {questions , questionsIndex, question } =  selfAssesmentQ([ <div>one</div>,<div>two</div>

])

return(
<div
style={{ position:"relative",}}
>
<form action=""> 

<div>
{questionsIndex + 1} / {questions.length}
</div>
{question}
</form>
</div>


)

}

showSelfAssesment();