import { createContext, useState, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_BASE_URL } from '../configs/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    const signin = async (username, password) => {
        try {
            const response = await fetch(`${APP_BASE_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            navigate('/admin/dashboard', { replace: true });
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }

    }

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/signin", {
            replace: true
        });
    }


    const value = useMemo(
        () => ({
            user,
            signin,
            signout
        }),

        // eslint-disable-next-line
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}