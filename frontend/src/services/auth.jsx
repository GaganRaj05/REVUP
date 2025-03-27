const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function login(formData) {
    try{
        console.log(BACKEND_URL)
        const response = await fetch(`${BACKEND_URL}/app/auth/login`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData)
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

async function Logout() {
    try {
        const response = await fetch(`${BACKEND_URL}/app/auth/logout`, {
            method:"POST",
            credentials:'include'
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err);
        return {error:err.message};
    }
}

async function Register(formData) {
    try {
        const response  = await fetch(`${BACKEND_URL}/app/auth/register`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData)
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

export {login,Logout,Register};