import { createContext, useState, useEffect } from "react"
import axiosClient, { getConfig } from "../config/axiosClient.js";
import { showAlertDelete, showModalAlert } from "../helpers/alerts.js";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

function AppProvider({ children }) {


    //------------------------ADMIN----------------------------------
    //Questions
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [modalQuestion, setModalQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [isEditingQuestion, setIsEditingQuestion] = useState(false);

    //Users
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [modalUser, setModalUser] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isEditingUser, setIsEditingUser] = useState(false);
    //---------------------------------------------------------------


    //------------------------STUDENT----------------------------------
    const [formQuestions, setFormQuestions] = useState([]);
    const [savedAnswers, setSavedAnswers] = useState([]);
    const [showSummary, setShowSummary] = useState(false);


    //-----------------------------------------------------------------

    //General
    const [alert, setAlert] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
    const [isClosingModal, setIsClosingModal] = useState(false);
    const [isActiveResponsive, setIsActiveResponsive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setFilteredUsers(users);
    }, [users])

    useEffect(() => {
        setFilteredQuestions(questions);
    }, [questions])




    const resetStates = () => {
        setQuestions([]);
        setFilteredQuestions([]);
        setUsers([]);
        setFilteredUsers([]);
        setAlert({});
        setFormQuestions([]);
        setSavedAnswers([]);
        sessionStorage.removeItem('answers');
    }

    const searchQuestion = (title) => {
        const result = questions.filter(question => question.question.toLowerCase().includes(title.toLowerCase()));
        setFilteredQuestions(result);
    }

    const getQuestions = async () => {
        setIsLoading(true);
        try {
            const url = '/questions/getQuestions';
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient(url, getConfig(token));
            setQuestions(data.questions);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }



    const getQuestionOptions = async (id) => {
        try {
            const url = `/questions/getOptions/${id}`
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient(url, getConfig(token));
            return data.options;
        } catch (error) {
            console.log(error);
        }
    }

    const createQuestion = async (question) => {
        try {
            const url = '/questions/create';
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient.post(url, question, getConfig(token));
            question.id = data.data;
            setQuestions([question, ...questions]);
            handleModalQuestion();
            showModalAlert({ title: 'Pregunta creada', msg: data.message, error: false });
            return true;

        } catch (error) {
            showModalAlert({ msg: error.response.data.message, error: true });
            return false;
        }
    }

    const editQuestion = async (question) => {
        try {
            const url = `/questions/updateQuestion/${question.id}`
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient.put(url, question, getConfig(token));
            const updatedQuestions = questions.map(_question => _question.id === question.id ? question : _question);
            setQuestions(updatedQuestions);
            showModalAlert({ title: 'Cambios guardados', msg: data.message, error: false });
            return true;

        } catch (error) {
            showModalAlert({ msg: error.response.data.message, error: true });
            return false;
        }
    }

    const deleteQuestion = async (id) => {
        const confirm = await showAlertDelete('¿Estas seguro de que quieres eliminar esta pregunta?');
        if (!confirm.isConfirmed) return;
        try {
            const url = `/questions/deleteQuestion/${id}`
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient.delete(url, getConfig(token));
            const updatedQuestions = questions.filter(_question => _question.id !== id);
            setQuestions(updatedQuestions);
            showModalAlert({ title: 'Pregunta eliminada', msg: data.message, error: false });
            handleModalQuestion();
            setAlert({});
            return true;

        } catch (error) {
            showModalAlert({ msg: error.response.data.message, error: true });
            return false;
        }
    }

    const handleModalQuestion = async (question) => {
        if (modalQuestion) {
            setModalQuestion(false);
            setTimeout(() => {
                setIsEditingQuestion(false);
                setCurrentQuestion({});
            }, 400);
            return;
        }

        if (question) {
            setModalQuestion(true);
            setIsLoadingOptions(true);
            const options = await getQuestionOptions(question.id);
            setIsLoadingOptions(false);
            question.options = options;
            setCurrentQuestion(question);
            return;
        }

        setModalQuestion(true);
    }


    const searchUser = (searchTerm) => {

        if (isNaN(searchTerm)) {
            const result = users.filter(user => {
                const fullName = (user.firstName + user.secondName + user.surname + user.secondSurName).toLowerCase();
                return fullName.includes(searchTerm.toLowerCase());
            })
            setFilteredUsers(result);
            return;
        }

        const result = users.filter(user => user.documentNumber.toString().includes(searchTerm));
        setFilteredUsers(result);

    }

    const getUsers = async () => {
        setIsLoading(true);
        try {
            const url = '/user/getUsers';
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient(url, getConfig(token));
            setUsers(data.users);
        } catch (error) {
            showModalAlert({ msg: error.response.data.message, error: true });
        } finally {
            setIsLoading(false);
        }
    }

    const getUser = async (id) => {
        try {
            const url = `/user/getUser/${id}`;
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient(url, getConfig(token));
            setCurrentUser(data);
        } catch (error) {
            setModalUser(false);
            showModalAlert({ msg: error.response.data.message, error: true });
        }
    }

    const editUser = async (userData) => {
        try {
            const url = `/user/update/${userData.id}`;
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient.put(url, userData, getConfig(token));
            const updatedUsers = users.map(user => {
                if (user.id === userData.id) {
                    user.firstName = userData.firstName;
                    user.secondName = userData.secondName;
                    user.surname = userData.surname;
                    user.secondSurName = userData.secondSurName;
                    user.documentNumber = userData.documentNumber;
                }
                return user;
            })
            setUsers(updatedUsers);
            handleModalUser();
            showModalAlert({ title: 'Cambios guardados', msg: data.message, error: false });
        } catch (error) {
            showModalAlert({ msg: error.response.data.message, error: true });
        }
    }

    const createUser = async (userData) => {
        try {
            const url = '/user/create';
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient.post(url, userData, getConfig(token));
            setUsers([data.data, ...users]);
            handleModalUser();
            showModalAlert({ title: 'Usuario Creado', msg: data.message, error: false });
        } catch (error) {
            showModalAlert({ msg: error.response.data.message, error: true });
        }
    }

    const handleModalUser = async (id) => {

        if (modalUser) {
            setIsClosingModal(true);
            setModalUser(false);
            setTimeout(() => {
                setCurrentUser({});
                setIsEditingUser(false);
                setAlert({});
                setIsClosingModal(false);
            }, 400);
            return;
        }

        if (isClosingModal) return;

        setModalUser(true);
        if (id) {
            setIsLoadingOptions(true);
            await getUser(id);
            setIsLoadingOptions(false);
        }

    }

    const getFormQuestions = async () => {
        setIsLoading(true);
        try {
            const url = '/form/getquestions'
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient(url, getConfig(token));
            setFormQuestions(data.questions);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    const saveFormQuestions = async (answersData) => {
        try {
            const url = '/form/postquestions'
            const token = sessionStorage.getItem('token');
            if (!token) return;
            const { data } = await axiosClient.post(url, answersData, getConfig(token));
            showModalAlert({ title: 'Repuestas almacenadas', msg: data.message, error: false })
            handleSummary();

        } catch (error) {
            showModalAlert({ msg: error.response.data.message, error: true })
        }
    }

    const handleSummary = () => {
        setShowSummary(true);
        sessionStorage.setItem('answers', JSON.stringify(formQuestions));
        setSavedAnswers(formQuestions);
        navigate('/dashboard/student/summary')

    }

    const addSelectedOption = (questionData) => {
        const updatedFormQuestions = formQuestions.map(question => {
            if (questionData.id === question.id) {
                question.selectedOption = question.options.filter(option => option.id === questionData.optionId)[0];
            }
            return question;
        })

        setFormQuestions(updatedFormQuestions);
    }


    return (
        <AppContext.Provider
            value={{
                questions,
                filteredQuestions,
                searchQuestion,
                getQuestions,
                getQuestionOptions,
                createQuestion,
                editQuestion,
                deleteQuestion,
                currentQuestion,
                modalQuestion,
                handleModalQuestion,
                isEditingQuestion,
                setIsEditingQuestion,
                alert,
                setAlert,
                isLoading,
                isLoadingOptions,
                getUsers,
                users,
                modalUser,
                handleModalUser,
                currentUser,
                isEditingUser,
                setIsEditingUser,
                editUser,
                createUser,
                searchUser,
                filteredUsers,
                getFormQuestions,
                formQuestions,
                saveFormQuestions,
                addSelectedOption,
                savedAnswers,
                setSavedAnswers,
                showSummary,
                resetStates,
                isActiveResponsive,
                setIsActiveResponsive
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;

export {
    AppProvider
}