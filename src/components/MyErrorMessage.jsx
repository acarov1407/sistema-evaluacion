import { ErrorMessage } from "formik"

function MyErrorMessage({name, component}) {
  return (
    <ErrorMessage name={name} component={component} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2"/>
  )
}

export default MyErrorMessage