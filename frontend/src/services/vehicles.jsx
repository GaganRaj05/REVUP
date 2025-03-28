const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function Get_Vehicles() {
    try {
        const response = await fetch(`${BACKEND_URL}/app/features/vehicles`,{
            method:"GET",
            credentials:'include',
        });
        const data = await response.json();
        console.log(data);
        if(!response.ok) return {error:data.error};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message}
    }
}

export default Get_Vehicles;