'use client'
import React, { FormEvent , useState } from "react";
import { SelfAQForm } from "./selfAQForm";
import { QOne } from "./qOne";
import { QTwo } from "./qTwo";
import { QThree } from "./qThree";


type FormData = {

 strengths:string
next_career: string 
}

const INIIAL_DATA: FormData = {
strengths:"",
next_career: ""

}


export default function SelfAssesmentQuestions () {
const [data, setData] = useState(INIIAL_DATA)

function updateTextArea(textArea: Partial<FormData>){

  setData(prev => {

    return {...prev, ...textArea}
  })
}


const {questions, questionIndex, question, backQtn, nextQtn } = SelfAQForm([ <QOne key="Id0" {...data}  />,
<QTwo key="Id1" {...data}  updateTextArea={updateTextArea}/>,
<QThree key="Id2" {...data}  updateTextArea={updateTextArea}/>
])


function submitForm(e: FormEvent){
  e.preventDefault();

 if (questionIndex !== questions.length - 1){
  nextQtn();
 } else {
  //  send the data
  alert('form submitted')
  console.log(data)
 }

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