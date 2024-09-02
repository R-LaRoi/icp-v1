import { selfAssesmentQuestions } from '../dataQuestions'
import { QWrapper } from '../../QWrapper'
let selfQ = selfAssesmentQuestions

type UserTextData = {
  industry_pref: string
}

type QSixProps = UserTextData & {
  updateTextArea: (textArea: Partial<UserTextData>) => void
}

export function QSix({ industry_pref, updateTextArea }: QSixProps) {

  let introQ6
    = selfQ.find((selfOne) => selfOne.id === 6)
  return (

    <QWrapper title="Introspective">
      <div key={introQ6
        ?.id}>
        <div className='font-regular m-4 text-3xl text-stone-600'>

          {introQ6?.question}
        </div>
        <div className='font-light m-4 text-2xl text-stone-600'>
          {introQ6?.selections}
        </div>
        <div className="relative w-full min-w-[200px] max-w-2xl">
          <textarea
            name="industry_pref"
            value={industry_pref}
            onChange={e => updateTextArea({ industry_pref: e.target.value })}
            className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            required
          ></textarea>
          <label
            className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
          >
            Industry Preference
          </label>
        </div>
      </div>

    </QWrapper>

  )

}