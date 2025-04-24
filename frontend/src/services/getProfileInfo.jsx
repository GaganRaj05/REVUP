const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getProfileInfo = async (user_id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/features/profile-info?search=${user_id}`, {
            method:"GET",
            credentials:'include'
        });
        const data = await response.json();
        if(response.error) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error: err.message};
    }
}
export default getProfileInfo;