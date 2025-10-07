import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure you have named import

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    const login = (token) => {
        const decodedAdmin = jwtDecode(token);
        setAdmin(decodedAdmin);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('token');
    };

    return (
        <AdminContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    return useContext(AdminContext);
};
