import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

function QuestionSummary({ question }) {

    const isCorrect = question.selectedOption.isCorrect;

    return (
        <div className={`shadow p-5 rounded bg-neutral-50`}>
            <p className="border-b border-neutral-300 pb-2 font-medium">{question.question}</p>
            <ul className="mt-5 flex flex-col gap-2">
                {
                    question.options.map(option => (
                        <li key={option.id} className={`flex items-center gap-2 p-2`}>
                            {

                                question.selectedOption.id === option.id
                                    ?
                                    (
                                        <>
                                            {
                                                isCorrect ? <CheckIcon className="h-6 w-6 text-green-500" /> : <XMarkIcon className="h-6 w-6 text-red-500" />
                                            }
                                            <p>{option.option}</p>
                                        </>
                                    )
                                    :
                                    (
                                        <p className="pl-8">{option.option}</p>
                                    )
                            }

                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default QuestionSummary