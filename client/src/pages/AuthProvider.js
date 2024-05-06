import React, { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext({
    isLoggedIn: false,
    setLoggedIn: () => {} // o cualquier valor inicial apropiado
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            // Si hay un token en las cookies, el usuario está autenticado
            setLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;