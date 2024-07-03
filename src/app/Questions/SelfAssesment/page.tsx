'use client'
import React from "react";
import { selfAQForm } from "../../icpHome/selfAQForm";

export default function SelfAssesmentQuestions () {
   
const {questions, questionIndex, question, backQtn, nextQtn } =  selfAQForm([

  <div>One</div>,<div>Two</div>
])


return(


<div>
<form>
<div style={{ position: "absolute", top: "5rem", right: "5rem"}}>
{questionIndex + 1} \ {questions.length}
</div>
{question}
<div style={{ marginTop: "1rem", display:"flex", justifyContent: 'flex-end', gap:'.5rem'}}>
  {questionIndex !== 0 &&  
  <button type="button"  
  onClick={backQtn}>Back</button> }

  <button type="button" onClick={nextQtn}>
    {questionIndex === questions.length - 1 ? "done" : "next" }</button>
</div>
</form>
</div>

)


}