'use client'
import React, { FormEvent, useState } from "react";
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
import { Navigation } from "../../nav"
import AnswerPage from "../../Answers/AnswerPage";
import Image from 'next/image'
import sandy from '../sandy.png'

export type FormData = {
  introspective: string | null
  strengths: string
  next_career: string
  wkExp_values: string
  career_concerns: string
  industry_pref: string
  dream_acc: string
  motivation: string
  factors: string[]
}

const INIIAL_DATA: FormData = {
  introspective: null,
  strengths: '',
  next_career: '',
  wkExp_values: '',
  career_concerns: '',
  industry_pref: '',
  dream_acc: '',
  motivation: '',
  factors: []
}




export default function SelfAssesmentQuestions() {
  const [data, setData] = useState(INIIAL_DATA)
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateTextArea(textArea: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...textArea }
    })
  }

  function updateAnswer(answerText: string) {
    setData(prev => ({ ...prev, introspective: answerText }))
  }

  function updateCheckbox(answerChecked: string[]) {
    setData(prev => ({ ...prev, factors: answerChecked }))
  }


  const { questions, questionIndex, question, backQtn, nextQtn } = SelfAQForm([

    <QOne key="1" selectedAnswer={updateAnswer} />,
    <QTwo key="2" {...data} updateTextArea={updateTextArea} />,
    <QThree key="3" {...data} updateTextArea={updateTextArea} />,
    <QFour key="4" {...data} updateTextArea={updateTextArea} />,
    <QFive key="5" {...data} updateTextArea={updateTextArea} />,
    <QSix key="6" {...data} updateTextArea={updateTextArea} />,
    <QSeven key="7" {...data} updateTextArea={updateTextArea} />,
    <QEight key="8" {...data} updateTextArea={updateTextArea} />,
    <QNine key="9" answerChecked={updateCheckbox} />
  ])


  function submitForm(e: FormEvent) {
    e.preventDefault();
    if (questionIndex !== questions.length - 1) {
      nextQtn();
    } else {
      setIsSubmitted(true);
      console.log(data);
    }
  }

  if (isSubmitted) {
    return <AnswerPage data={data} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="w-full md:w-1/2 bg-[#3B28CC] text-white p-8 overflow-y-auto flex flex-col">
          <form onSubmit={submitForm} className="flex flex-1 flex-col overflow-hidden">
            <div className="absolute top-0 right-0 text-2xl mb-4 p-4 z-10">
              {questionIndex + 1} \ {questions.length}
            </div>
            <div className="text-reveal flex-grow">
              <span>{question}</span>
            </div>
            <div className="mt-[-12rem] ml-4 relative z-90">
              <div className="flex justify-start gap-2">
                {questionIndex !== 0 &&
                  <button className="border border-white text-white hover:bg-white hover:text-[#3B28CC] font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                    type="button"
                    onClick={backQtn}>BACK</button>}
                <button
                  className="bg-white text-[#3B28CC] hover:bg-indigo-200 font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                  type="submit">
                  {questionIndex === questions.length - 1 ? "DONE" : "NEXT"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 bg-[#E5F1FE] flex justify-center items-center">
          <Image src={sandy}
            width={400}
            height={400}
            alt="illustration"
            priority={true} />
        </div>
      </div>
    </div>


  )

}