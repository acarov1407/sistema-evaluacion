import { useState } from "react";
import { validateStudentFormAnswers } from "../../helpers/validations.js";
import useApp from "../../hooks/useApp";
import Question from "./Question"
import Alert from "../Alert.jsx";


function AnswersForm({ questions }) {

    const [answers, setAnswers] = useState({});

    const { alert, setAlert, saveFormQuestions, addSelectedOption } = useApp();

    const handleAnswerChange = (questionId, value) => {
        addSelectedOption({id: questionId, optionId: value})
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validate = validateStudentFormAnswers({ answers, totalQuestions: questions.length });
        if (!validate.isValid) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setAlert({ error: true, msg: validate.msg })
            return;
        }

        setAlert({});

        const user = JSON.parse(sessionStorage.getItem('user'));
        saveFormQuestions({studentId: user.id, answers: Object.values(answers)})

    }
    return (
        <form
            className="mt-10"
            onSubmit={handleSubmit}
        >
            {
                alert.msg && <Alert alert={alert} />
            }
            <div className="grid lg:grid-cols-2 gap-4">
                {
                    questions.map((question, index) => (
                        <Question key={question.id} question={question} number={index + 1} handleAnswerChange={handleAnswerChange} />
                    ))
                }
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white text-sm font-bold uppercase py-2 px-12 rounded hover:bg-blue-600 transition-colors mt-8 w-full text-center lg:w-auto"
            >
                Enviar Respuestas
            </button>
        </form>
    )
}

export default AnswersForm