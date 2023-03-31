import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient.js";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [auth, setAuth] = useState({});
    const [alert, setAlert] = useState({});
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);


    const navigate = useNavigate();

    const loadUserInfo = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(!user) {
            setIsLoadingInfo(false);
            return;
        } 
        setAuth(user);
        setIsLoadingInfo(false);
    }

    useEffect(() => {
        loadUserInfo();
    }, []);

    const login = async (formData) => {

        try {
            const url = '/login';
            const { data } = await axiosClient.post(url, formData);
            const { message, ...user } = data;
            setAuth(user);
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', data.token);
            setAlert({});
            navigate('/dashboard/admin');
        } catch (error) {
            setAlert({ error: true, msg: error.response.data.message });
        }
    }

    const logout = () => {
        setAuth({});
        setAlert({});
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                isLoadingInfo,
                alert,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

export {
    AuthProvider
}