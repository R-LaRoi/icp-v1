'use client'
import React, { FormEvent , useState } from "react";
import { SelfAQForm } from "./selfAQForm";
import { QOne } from "./QComponents/qOne";
import { QTwo } from "./QComponents/qTwo";
import { QThree } from "./QComponents/qThree";
import { QFour } from "./QComponents/qFour";
import { QFive } from "./QComponents/qFive";
import { QSix } from "./QComponents/qSix";
import { QSeven } from "./QComponents/qSeven";
import { QEight } from "./QComponents/qEight";
import { QNine } from "./QComponents/qNine";
import { Navigation } from "../../icpHome/nav"


type FormData = {
strengths:string
next_career: string 
wkExp_values: string
career_concerns: string
industry_pref: string
dream_acc: string
motivation: string
}

const INIIAL_DATA: FormData = {
strengths:'',
next_career: '',
wkExp_values: '',
career_concerns: '',
industry_pref: '',
dream_acc: '',
motivation: '',
}


export default function SelfAssesmentQuestions () {
const [data, setData] = useState(INIIAL_DATA)

function updateTextArea(textArea: Partial<FormData>){

  setData(prev => {

    return {...prev, ...textArea}
  })
}


const {questions, questionIndex, question, backQtn, nextQtn } = SelfAQForm([ <QOne key="1" {...data}  />,
<QTwo key="2" {...data}  updateTextArea={updateTextArea}/>,
<QThree key="3" {...data}  updateTextArea={updateTextArea}/>,
<QFour key="4" {...data}  updateTextArea={updateTextArea}/>,<QFive key="5" {...data}  updateTextArea={updateTextArea}/>,
<QSix key="5" {...data}  updateTextArea={updateTextArea}/>,
<QSix key="6" {...data}  updateTextArea={updateTextArea}/>,
<QSeven key="7" {...data}  updateTextArea={updateTextArea}/>,
<QEight key="8" {...data}  updateTextArea={updateTextArea}/>,
<QNine key="9" {...data} /> 
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
   <Navigation />
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