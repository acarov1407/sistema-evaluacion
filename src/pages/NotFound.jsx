import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="max-w-md text-center min-h-screen flex justify-center mx-auto items-center">
            <div>
                <h1 className="text-5xl font-bold text-blue-500 mb-8">404 Not Found</h1>
                <p className="text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
                <Link to="/dashboard/admin/questions" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Volver al inicio
                </Link>
            </div>

        </div>
    )
}

export default NotFound