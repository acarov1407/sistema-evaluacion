import { CheckIcon } from '@heroicons/react/24/outline'
import useApp from "../hooks/useApp"
import Spinner from "./Spinner";

function Question() {

    const { currentQuestion, isLoadingOptions } = useApp();

    if (isLoadingOptions) return <Spinner />
    return (
        <div className="md:max-w-sm rounded">
            <p className="text-lg">{currentQuestion.question}</p>
            <ul className={`px-4 mt-4 flex flex-col gap-3`}>
                {
                    currentQuestion?.options?.map(option => (
                        <li key={option.id} className={`p-2 shadow bg-white  rounded border-neutral-200 flex items-center justify-between`}>
                            <p>{option.option}</p>
                            {
                                option.iscorrect && <CheckIcon className="h-6 w-6 text-green-600" />
                            }
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default Question