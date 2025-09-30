import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAccessToken, putAccessToken, getUserLogged, login as apiLogin, register as apiRegister } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function init() {
            const token = getAccessToken();
            if (token) {
                const { error, data } = await getUserLogged();
                if (!error) setUser(data);
            }
            setInitializing(false);
        }
        init();
    }, []);

    async function login(credentials) {
        const { error, data } = await apiLogin(credentials);
        if (!error) {
            putAccessToken(data.accessToken);
            const { error: err2, data: userData } = await getUserLogged();
            if (!err2) setUser(userData);
            navigate('/notes');
            return true;
        }
        return false;
    }

    async function register(credentials) {
        const { error } = await apiRegister(credentials);
        if (!error) {
            navigate('/login');
            return true;
        }
        return false;
    }

    function logout() {
        putAccessToken('');
        localStorage.removeItem('accessToken');
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, initializing, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
