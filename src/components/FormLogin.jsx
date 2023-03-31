import useAuth from "../hooks/useAuth";
import { Form, Formik} from "formik";
import { validateLoginForm } from "../helpers/validations.js";
import UserField from "./UserField";
import Alert from "./Alert";

function FormLogin() {

    const { login, alert } = useAuth();

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={login}
            validate={validateLoginForm}
        >
            <Form className="px-10 py-6 rounded-md bg-neutral-100 w-full md:max-w-sm shadow">
                <h2 className="text-3xl font-bold text-neutral-900 mb-5">Iniciar Sesión</h2>
                {alert.msg && <Alert alert={alert} />}
                <UserField data={{ id: 'email', name: 'email', type: 'email'}} label="Correo electrónico" error={true} />
                <UserField data={{ id: 'password', name: 'password', type: 'password'}} label="Contraseña" error={true} margin={true} />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors font-bold uppercase text-sm mt-5">
                    Ingresar
                </button>
            </Form>
        </Formik>

    )
}

export default FormLogin