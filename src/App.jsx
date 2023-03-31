import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { AppProvider } from "./context/AppProvider";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardStudentLayout from "./layouts/DashboardStudentLayout";
import Principal from "./pages/Principal";
import Questions from "./pages/Questions";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Evaluation from "./pages/student/Evaluation";
import Summary from "./pages/student/Summary";


function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="auth/login" element={<Login />} />

            <Route path="/dashboard/admin" element={<DashboardLayout />}>
              <Route index element={<Principal />} />
              <Route path="questions" element={<Questions />} />       
              <Route path="users" element={<Users />} />
            </Route>

            <Route path="/dashboard/student" element={<DashboardStudentLayout />}>
              <Route index element={<Evaluation />} />
              <Route path="summary" element={<Summary />} />
            </Route>

            <Route path="*" element={<NotFound />} />


          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
