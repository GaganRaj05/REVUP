const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const deletePost = async(post_id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/features/delete-post?post_id=${post_id}`, {
            method:"DELETE",
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
const deleteEvent = async(event_id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/features/delete-event?event_id=${event_id}`, {
            method:"DELETE",
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
const deleteVehicle = async(vehicle_id)=> {
    try {
        const response = await fetch(`${BACKEND_URL}/features/delete-vehicle?vehicle_id=${vehicle_id}`, {
            method:"DELETE",
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


export {deleteEvent, deletePost, deleteVehicle};
