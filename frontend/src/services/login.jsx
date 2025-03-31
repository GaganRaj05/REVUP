const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function Login_Service(formData) {
    try {   
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData),
            credentials:"include"
        })
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
export default Login_Service;