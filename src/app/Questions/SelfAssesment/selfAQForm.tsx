import { ReactElement, useState } from "react";


// managing the fwd/back navigation 

export function SelfAQForm(questions: ReactElement[]) {

  const [questionIndex, setQuestionIndex] = useState(0)


  function nextQtn() {

    setQuestionIndex(i => {
      if (i >= questions.length - 1)
        return i;
      return i + 1

    })

  }

  function backQtn() {
    setQuestionIndex(i => {
      if (i <= 0)
        return i;
      return i - 1

    })
  }

  function getQtn(index: number) {
    setQuestionIndex(index)

  }

  return {
    questionIndex,

    question: questions[questionIndex],
    questions, getQtn, nextQtn, backQtn
  }

}