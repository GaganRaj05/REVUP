import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const [user, setUser] = useState(null);

    useEffect(()=> {
        async function fetchUser() {
            setUser(null);
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