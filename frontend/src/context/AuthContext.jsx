import { createContext, useContext, useState, useEffect } from "react";
import checkAuth from "../services/checkAuth";
const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const [user, setUser] = useState(null);

    useEffect(()=> {
        async function fetchUser() {
            const response = await checkAuth();
            if(response.error) {
                setUser(null);
                return;
            }
            setUser(response.data);
        }
        fetchUser();
    },[]);

    useEffect(()=> {
        console.log(user);
    },[user])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}