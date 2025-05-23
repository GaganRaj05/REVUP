const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Logout = async()=> {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/logout`,{
            method:'POST',
            credentials:'include'
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

export default Logout;