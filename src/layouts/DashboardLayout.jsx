import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

function DashboardLayout() {

    const { isLoadingInfo } = useAuth();

    const admin = useAdmin();
    
    if (isLoadingInfo) return <Spinner /> 
    return (
        <>
            {
                admin
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
                    <Navigate to="/dashboard/student" />
            }
        </>
    )
}

export default DashboardLayout