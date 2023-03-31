import { useEffect } from "react"
import useApp from "../../hooks/useApp";
import AnswersForm from "../../components/student/AnswersForm";
import Spinner from "../../components/Spinner";

function Evaluation() {

  const { getFormQuestions, formQuestions, isLoading} = useApp();

  useEffect(() => {
    getFormQuestions();
  }, [])

  if (isLoading) return <Spinner />
  return (

    <div>
      <h1 className="text-3xl font-bold text-neutral-900">Formulario</h1>
      <AnswersForm questions={formQuestions} />
    </div>

  )
}

export default Evaluation