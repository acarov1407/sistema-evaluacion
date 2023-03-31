import { AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Link} from "react-router-dom"

function Principal() {

    return (
        <div>
            <h1 className="text-3xl font-bold text-neutral-900 text-center">Bienvenido al Sistema de Evaluación</h1>
            <p className="text-2xl font-medium text-neutral-900 text-center mt-5">Por favor elija una opción:</p>
            <div className="mt-12 grid grid-rows-2 md:grid-cols-2 md:grid-rows-none max-w-lg mx-auto gap-8">
                <Link
                    className="cursor-pointer"
                    to="/dashboard/admin/questions"
                >
                    <div className="text-center shadow bg-neutral-50 px-5 py-10 rounded cursor-pointer hover:bg-neutral-100 transition-all border hover:border-blue-500">
                        <p className="font-medium text-lg text-neutral-800">Administrar <span className="block">Preguntas</span></p>
                        <AcademicCapIcon className="h-20 w-20 mx-auto mt-5" />
                    </div>
                </Link>

                <Link
                    className="cursor-pointer"
                    to="/dashboard/admin/users"
                >
                    <div className="text-center shadow bg-neutral-50 px-5 py-10 rounded cursor-pointer hover:bg-neutral-100 transition-all border hover:border-blue-500">
                        <p className="font-medium text-lg text-neutral-800">Administrar <span className="block">Usuarios</span></p>
                        <UsersIcon className="h-20 w-20 mx-auto mt-5" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Principal