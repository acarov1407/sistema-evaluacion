import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

function DashboardStudentLayout() {
    const { auth, isLoadingInfo } = useAuth();


    if (isLoadingInfo) return <Spinner />

    return (
        <>
            {
                auth.id
                    ?
                    <>
                        <Header />
                        <div className="md:flex custom-vh">
                            <Sidebar />

                            <main className="flex-1 p-10 max-w-6xl mx-auto">
                                <Outlet />
                            </main>
                        </div>
                    </>
                    :
                    <Navigate to="/auth/login" />
            }
        </>
    )
}

export default DashboardStudentLayout