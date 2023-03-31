import { useEffect} from 'react'
import useApp from "../../hooks/useApp"
import QuestionSummary from "../../components/student/QuestionSummary";

function Summary() {

    const { savedAnswers, setSavedAnswers, showSummary } = useApp();


    useEffect(() => {
        setSavedAnswers(JSON.parse(sessionStorage.getItem('answers')));
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, []);

    const countCorrectAnswers = () => {
        return savedAnswers.filter(question => question.selectedOption.isCorrect).length;
    }

    const calculateScore = () => {
        return parseInt((countCorrectAnswers() / savedAnswers.length) * 100);
    }

    if(!showSummary) return <p> No hay cuestionarios activos </p>

    return (
        <div>
            <h1 className="text-3xl font-bold text-neutral-900">Resumen de tus respuestas</h1>
            <div className="mt-5 shadow bg-neutral-50 p-5 rounded">
                <p className="font-medium">{`Respuestas Correctas: ${countCorrectAnswers()}/${savedAnswers.length}`}</p>
                <p className="mt-2 font-medium">Calificación: 
                <span className={`p-1 ${calculateScore() > 60 ? 'text-green-600' : 'text-red-600'}`}>{`${calculateScore()}%`}</span>
                </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 mt-5">
                {
                    savedAnswers.map(question => (
                        <QuestionSummary key={question.id} question={question} />
                    ))
                }
            </div>
        </div>
    )
}

export default Summary