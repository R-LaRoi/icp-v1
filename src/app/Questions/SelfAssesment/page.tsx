'use client'
import React, { FormEvent } from "react";
import { selfAQForm } from "../../icpHome/selfAQForm";
import { QOne } from "./qOne";
import { QTwo } from "./qTwo";
import { QThree } from "./qThree";

export default function SelfAssesmentQuestions () {
   
const {questions, questionIndex, question, backQtn, nextQtn } =  selfAQForm([

<QOne key="uniqueId1"/>,<QTwo key="uniqueId1"/>,<QThree key="uniqueId1"/>
])


function submitForm(e: FormEvent){
  e.preventDefault();
  nextQtn();
}

return(


<div>
<form onSubmit={submitForm}>
<div>
{questionIndex + 1} \ {questions.length}
</div>
{question}
<div style={{ marginTop: "1rem", display:"flex", justifyContent: 'flex-end', gap:'.5rem'}}>
  {questionIndex !== 0 &&  
  <button type="button"  
  onClick={backQtn}>Back</button> }

  <button 
  className="arrows mx-2 mt-2 px-2"

  type="submit" >
    {questionIndex === questions.length - 1 ? "done" : "next" }</button>
</div>
</form>
</div>

)


}