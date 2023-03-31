import { Form, Formik } from "formik";
import UserField from "./UserField";
import useApp from "../hooks/useApp";
import { documentTypes } from "../helpers/mapping.js";
import { validateUserForm } from "../helpers/validations.js";
import { formatUser } from "../helpers/formatting.js";
import Alert from "./Alert";


function FormUser({ editMode }) {

    const { currentUser, editUser, createUser, alert, setAlert, isEditingUser } = useApp();

    const showSubmitButton = (editMode && isEditingUser) || !editMode;
    const isInputDisabled = editMode && !isEditingUser;



    const handleEdit = (userData) => {
        editUser(userData);
    }

    const handleCreate = (userData) => {
        userData.password = `${userData.firstName}_${userData.documentNumber}`;
        createUser(userData)
    }

    const handleSubmit = (userData) => {
        const validation = validateUserForm(userData)
        if (!validation.isValid) {
            setAlert({ error: true, msg: validation.error });
            return;
        }

        setAlert({});

        const user = formatUser(userData);

        if (editMode) {
            handleEdit(user);
            return;
        }

        handleCreate(user);
    }

    const initialEmptyValues = {
        firstName: '', secondName: '',
        surname: '', secondSurName: '',
        typeDocument: '1', documentNumber: '',
        phone: '', email: ''
    }

    const initialValues = currentUser.id ? currentUser : initialEmptyValues;


    return (
        <Formik
            initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                {alert.msg && <Alert alert={alert} />}
                <div className="grid grid-cols-2 gap-6">
                    <UserField data={{ id: 'firstName', name: 'firstName', isRequired: true, isDisabled: isInputDisabled }} label="Primer Nombre:" />
                    <UserField data={{ id: 'secondName', name: 'secondName', isDisabled: isInputDisabled }} label="Segundo Nombre:" />
                    <UserField data={{ id: 'surname', name: 'surname', isRequired: true, isDisabled: isInputDisabled }} label="Primer Apellido:" />
                    <UserField data={{ id: 'secondSurName', name: 'secondSurName', isRequired: true, isDisabled: isInputDisabled }} label="Segundo Apellido:" />
                    <UserField data={{ id: 'typeDocument', name: 'typeDocument', isRequired: true, isDisabled: isInputDisabled, component: 'select' }} label="Tipo de documento:">
                        {
                            Object.entries(documentTypes).map((type) => (
                                <option key={type[0]} value={type[0]}>{type[1]}</option>
                            ))
                        }
                    </UserField>
                    <UserField data={{ id: 'documentNumber', name: 'documentNumber', type: 'number', isRequired: true, isDisabled: isInputDisabled }} label="Número de documento:" />
                    <UserField data={{ id: 'phone', name: 'phone', type: 'number', isRequired: true, isDisabled: isInputDisabled }} label="Teléfono:" />
                    <UserField data={{ id: 'email', name: 'email', type: 'email', isRequired: true, isDisabled: isInputDisabled }} label="Email:" />
                </div>

                {
                    showSubmitButton &&
                    <button
                        type="submit"
                        className="bg-blue-500 text-white text-sm uppercase py-2 px-4 hover:bg-blue-600 transition-colors font-bold mt-5 rounded"
                    >{editMode ? 'Guardar Cambios' : 'Crear Usuario'}</button>
                }

            </Form>
        </Formik>
    )
}

export default FormUser