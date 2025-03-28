const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function Like_Click (post_id) {
    try {
        const response = await fetch(`${BACKEND_URL}/app/features/post-like`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(post_id),
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
export default Like_Click;