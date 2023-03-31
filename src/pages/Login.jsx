import FormLogin from "../components/FormLogin"


function Login() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen container w-[92%] mx-auto">
      <h1 className="text-4xl font-bold text-blue-900 mb-10">Sistema de  <span className="block mt-2">Evaluación</span></h1>
      <FormLogin />
    </div>
  )
}

export default Login