import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useApp from "../hooks/useApp"
import { useEffect, useState } from "react";
import ModalQuestion from "../components/ModalQuestion";
import QuestionPreview from "../components/QuestionPreview";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Questions() {

  const [searchTerm, setSearchTerm] = useState('');

  const { getQuestions, questions, searchQuestion, filteredQuestions, isLoading, handleModalQuestion } = useApp();

  const navigate = useNavigate();

  const existQuestions = questions?.length > 0;

  useEffect(() => {
    if (questions.length === 0) getQuestions();
  }, []);

  useEffect(() => {
    setSearchTerm('');
  }, [questions])

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
    searchQuestion(e.target.value);
  }

  if (isLoading) return <Spinner />
  return (
    <div className="md:max-w-lg">
      <div className="flex flex-col gap-5 md:flex-row items-center justify-between md:gap-0">
        <h1 className="text-3xl text-neutral-900 font-bold">Preguntas Creadas</h1>
        <button
          type="button"
          className="bg-blue-500 text-white text-sm font-bold uppercase py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-600 transition-colors"
          onClick={() => handleModalQuestion()}
        >
          <PlusCircleIcon className="h-5 w-5" />
          Añadir Pregunta
        </button>
      </div>
      <div className="mt-8">
        <input
          type="search"
          className="block border border-neutral-300 rounded-md py-2 px-3 flex-1 focus:outline-none focus:border-blue-600 w-full md:w-2/5 md:transition-all focus:w-full md:duration-[500ms]"
          placeholder="Buscar Pregunta..."
          value={searchTerm}
          onChange={handleChangeSearch}
        />
      </div>
      {
        existQuestions
          ?
          <div className="mt-5 flex flex-col gap-4 overflow-y-scroll h-[600px] pr-4">
            {
              filteredQuestions.map(question => (
                <QuestionPreview key={question.id} question={question} />
              ))
            }

          </div>

          :
          <div className="p-10 border-neutral-300 border rounded bg-neutral-100 mt-5">
            <p className="text-center text-neutral-600 font-medium text-lg">Aún no has creado preguntas</p>
          </div>

      }

      <ModalQuestion />
    </div>
  )
}

export default Questions