import {ReactElement, useState} from 'react'


export function selfAssesmentQ(questions: ReactElement[]){

 const [questionsIndex, setQuestionsIndex] = useState(0)

function next(){

setQuestionsIndex(i => {
  if(i > questions.length - 1 ) return i;
  else return i + 1;
})
}

function back(){
setQuestionsIndex( i => {if(i <= 0) return i;
  else return i - 1;

} )

}

function goTo(index:number){
setQuestionsIndex(index)
console.log("object")
}

  return{
    questionsIndex,
    question: questions[questionsIndex], 
    questions,
    goTo,
    next,
    back,
  }

  // return(
  //   <>
  //   <h1>this is something</h1>
  //   </>
  // )
}