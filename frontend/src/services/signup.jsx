const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default async function Sign_up(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/register`, {
            method:"POST",
            body:formData
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