const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
async function GetEvents() {
    try {
        const response = await fetch(`${BACKEND_URL}/features/events`, {
            method:"GET"
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

async function getSpecificEvent() {

}

export {GetEvents, getSpecificEvent};