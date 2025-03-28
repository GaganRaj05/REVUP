const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function Get_Posts() {
    try {   
        const response = await fetch(`${BACKEND_URL}/app/features/posts`,{
            method:"GET",
            credentials:'include'
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
export default Get_Posts;