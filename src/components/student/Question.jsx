

function Question({ question, number, handleAnswerChange }) {
    return (
        <div className="shadow p-5 bg-white rounded">
            <label className="block border-b border-neutral-300 pb-2 font-medium">{`${number}) ${question.question}`}</label>
            <ul className="mt-5 flex flex-col gap-2">
                {
                    question.options.map(option => (
                        <li key={option.id} className="flex items-center gap-2 p-1">
                            <input
                                type="radio"
                                id={`option-${option.id}`}
                                name={`question-${question.id}`}
                                value={option.id}
                                onChange={() => handleAnswerChange(question.id, option.id)}
                            />
                            <label className="w-full block" htmlFor={`option-${option.id}`}>{option.option}</label>
                        </li>

                    ))
                }
            </ul>
        </div>
    )
}

export default Question