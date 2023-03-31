import { useEffect } from "react";
import useAuth from "../hooks/useAuth"
import useApp from "../hooks/useApp";
import useAdmin from "../hooks/useAdmin";
import { Link, useLocation } from "react-router-dom";
import { AcademicCapIcon, UsersIcon, ArrowLeftOnRectangleIcon, HomeIcon, ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline'


function Sidebar() {


    const { auth, logout } = useAuth();
    const { resetStates, isActiveResponsive, setIsActiveResponsive } = useApp();
    const admin = useAdmin();

    const location = useLocation();

    useEffect(() => {
        setIsActiveResponsive(false);
    }, [location.pathname])

    const handleLogout = () => {
        logout();
        resetStates();
    }

    return (
        <aside
            className={`bg-neutral-50 py-10 px-8 md:w-72 shadow-xl fixed block top-0 w-full h-full duration-500 md:relative md:h-auto md:left-0 z-40 md:z-0 ${isActiveResponsive ? 'left-0' : 'left-[-100%]'}`}
        >
            <div className="md:hidden mb-5">
                <button
                    className="text-neutral-900 hover:text-neutral-600 rounded transition-colors"
                    type="button"
                    onClick={() => setIsActiveResponsive(!isActiveResponsive)}
                >
                    <XMarkIcon className="h-7 w-7" />
                </button>
            </div>
            <div className="">
                <p className="text-neutral-900">Bienvenido(a) <span className="block">{auth.name}</span></p>
                <p className="text-neutral-900 font-medium uppercase text-xs mt-4">Rol:<span className="uppercase text-xs font-normal ml-2">{auth.role}</span></p>
            </div>

            <nav className="mt-8 border-y border-neutral-300 py-4">
                <ul className="flex flex-col h-full gap-4">
                    {
                        admin ?
                            (
                                <>
                                    <li>
                                        <Link
                                            to="/dashboard/admin"
                                            className={`flex items-center gap-2 hover:bg-neutral-200 p-3 rounded text-neutral-700 font-medium text-sm ${location.pathname === '/dashboard/admin' ? 'bg-neutral-200' : ''}`}>
                                            <HomeIcon className="h-6 w-6" />
                                            Página Principal
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/admin/questions"
                                            className={`flex items-center gap-2 hover:bg-neutral-200 p-3 rounded text-neutral-700 font-medium text-sm ${location.pathname === '/dashboard/admin/questions' ? 'bg-neutral-200' : ''}`}>
                                            <AcademicCapIcon className="h-6 w-6" />
                                            Preguntas
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/dashboard/admin/users"
                                            className={`flex items-center gap-2 hover:bg-neutral-200 p-3 rounded text-neutral-700 font-medium text-sm ${location.pathname === '/dashboard/admin/users' ? 'bg-neutral-200' : ''}`}>
                                            <UsersIcon className="h-6 w-6" />
                                            Usuarios
                                        </Link>
                                    </li>
                                </>
                            )
                            :
                            (
                                <li>
                                    <Link
                                        to="/dashboard/student"
                                        className={`flex items-center gap-2 hover:bg-neutral-200 p-3 rounded text-neutral-700 font-medium text-sm ${location.pathname === '/dashboard/student' ? 'bg-neutral-200' : ''}`}>
                                        <ListBulletIcon className="h-6 w-6" />
                                        Formulario
                                    </Link>
                                </li>
                            )
                    }

                </ul>
            </nav>



            <div className="mt-20">
                <button
                    className="flex items-center gap-2 text-neutral-700 p-3 w-full  text-sm uppercase rounded hover:bg-neutral-200 transition-colors font-medium"
                    type="button"
                    onClick={handleLogout}
                >
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                    Cerrar Sesión
                </button>
            </div>

        </aside>
    )
}

export default Sidebar