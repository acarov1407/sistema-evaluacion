import { ChevronRightIcon } from '@heroicons/react/24/solid';
import useApp from "../hooks/useApp";

function QuestionPreview({ question }) {


    const { handleModalQuestion } = useApp();

    return (
        <div className="bg-neutral-50 p-5 rounded-md border-neutral-500 border-l-4 shadow">
            <div className="flex items-center justify-between gap-2">
                <p className="text-gray-800 text-limit">{question.question}</p>
                <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 hover:bg-gray-200 p-2 rounded-full"
                    onClick={() => handleModalQuestion(question)}
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    )
}

export default QuestionPreview