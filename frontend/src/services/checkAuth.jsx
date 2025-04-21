const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default async function checkAuth() {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/check-login`,{
            method:"GET",
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