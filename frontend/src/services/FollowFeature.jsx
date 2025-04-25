const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const followFeature = async(userData, type)=> {
    try {
        if(type === "unfollow") {
            const response = await fetch(`${BACKEND_URL}/features/unfollow-request`, {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(userData),
                credentials:'include'
            })
            const data = await response.json();
            if(!response.ok) return {error:data};
            return data;
        }
        else {
            const response = await fetch(`${BACKEND_URL}/features/follow-request`, {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(userData),
                credentials:'include'
            })
            const data = await response.json();
            if(!response.ok) return {error:data};
            return data;

        }
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}
export default followFeature;