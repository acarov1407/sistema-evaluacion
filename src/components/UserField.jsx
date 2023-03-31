import { Field } from "formik"
import MyErrorMessage from "./MyErrorMessage";

function UserField({ data, label, margin, error, children }) {

    return (
        <div className={`${margin ? 'mt-5' : ''}`}>
            <label htmlFor={data.id} className="block text-neutral-700 mb-1">{label}</label>
            <Field
                type={data.type || 'text'}
                id={data.id}
                name={data.name}
                className="block border border-neutral-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-600"
                disabled={data.isDisabled}
                required={data.isRequired}
                as={data.component}
            >
                {children}
            </Field>
            {
                error && <MyErrorMessage name={data.name} component="div" />
            }
            
        </div>

    )
}

export default UserField