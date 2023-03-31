import { PlusSmallIcon, MinusSmallIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import useApp from "../hooks/useApp";
import { validateQuestionCreateForm } from "../helpers/validations.js";
import Alert from "./Alert";
import MyInput from "./MyInput";

function FormQuestion() {

  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([""]);
  const [correctOption, setCorrectOption] = useState(0);

  const { createQuestion,
    editQuestion,
    alert,
    setAlert,
    isEditingQuestion,
    currentQuestion,
    handleModalQuestion } = useApp();

  const navigate = useNavigate();

  const loadData = () => {
    setTitle(currentQuestion.question);
    setOptions(currentQuestion.options);
    const indexCorrectOption = currentQuestion.options.findIndex(option => option.iscorrect === true);
    setCorrectOption(indexCorrectOption);

  }

  useEffect(() => {
    if (isEditingQuestion) loadData();
  }, []);


  const MAX_NUMBER_OPTIONS = 4;

  const addOption = () => {
    if (options.length === MAX_NUMBER_OPTIONS) return;
    setOptions([...options, ""]);
  }

  const deleteOption = () => {
    if (options.length <= 1) return;
    if (correctOption === options.length - 1) setCorrectOption(0);
    const updatedOptions = [...options];
    updatedOptions.pop();
    setOptions(updatedOptions);
  }

  const handleChangeOptions = (value, index) => {
    const updatedOptions = [...options];
    if (options.includes('')) {
      updatedOptions[index] = { option: value };
    } else {
      updatedOptions[index].option = value;
    }
    setOptions(updatedOptions);
  }

  const addCorrectOption = () => {
    const updatedOptions = options.map((option, index) => {
      option.iscorrect = index === correctOption;
      return option;
    });

    setOptions(updatedOptions);
  }

  const handleCreate = async () => {
    const questionData = {
      question: title.trim(),
      options
    }

    const success = await createQuestion(questionData);
    if (success) {
      resetForm();
      navigate('/dashboard/admin/questions')
    }
  }

  const handleEdit = async () => {
    const questionData = {
      id: currentQuestion.id,
      question: title.trim(),
      options
    }
    const success = await editQuestion(questionData);

    if (success) {
      resetForm();
      handleModalQuestion();
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    addCorrectOption();

    const isValidForm = validateQuestionCreateForm({ title, options });
    if (!isValidForm) {
      setAlert({ error: true, msg: 'Todos los campos son obligatorios' });
      return;
    }

    setAlert({});

    if (isEditingQuestion) {
      handleEdit();
      return;
    }

    handleCreate();

  }

  const resetForm = () => {
    setTitle('');
    setOptions([]);
    setCorrectOption(0);
  }

  return (
    <form className="md:max-w-sm" onSubmit={handleSubmit}>
      {alert.msg && <Alert alert={alert} />}
      <div>
        <label htmlFor="title" className="block text-neutral-700 font-bold mb-2 text-lg">Título</label>
        <MyInput value={title} handleValue={setTitle} data={{ id: "title", name: "title", placeholder: "" }} autoFocus={true} />

      </div>
      <div className="mt-6">
        <div className="flex items-center mb-2 gap-4">
          <label htmlFor="title" className="block text-neutral-700 font-bold text-lg">Opciones</label>
          {
            !isEditingQuestion &&
            <>
              <button
                type="button"
                onClick={addOption}
                className="bg-neutral-500 rounded-full text-white font-bold text-xs uppercase hover:bg-neutral-600 transition-colors"
              >
                <PlusSmallIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={deleteOption}
                className="bg-neutral-500 rounded-full text-white font-bold text-xs uppercase hover:bg-neutral-600 transition-colors"
              >
                <MinusSmallIcon className="h-5 w-5" />
              </button>
            </>
          }

        </div>

        <ul className="flex flex-col gap-4 mt-4">
          {
            options.map((option, index) => (
              <li key={index} className="flex items-center gap-2">
                <MyInput
                  value={option.option}
                  handleValue={handleChangeOptions}
                  data={{ id: `option${index + 1}`, name: `option${index + 1}`, placeholder: `Opción ${index + 1}` }}
                  index={index}
                  autoFocus={index > 0}
                />
                <input
                  type="checkbox"
                  name="options"
                  className="w-4 h-4"
                  checked={correctOption === index}
                  onChange={() => setCorrectOption(index)}
                />
              </li>
            ))
          }
        </ul>
      </div>

      {
        options.length >= 2 &&
        <button
          type="submit"
          className="py-2 px-3 bg-blue-500 rounded text-white uppercase font-bold text-sm mt-5 hover:bg-blue-600 transition-colors"
        >{isEditingQuestion ? 'Guardar Cambios' : 'Crear Pregunta'}</button>
      }
    </form>
  )
}

export default FormQuestion