const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function Upload_Vehicle(formData) {
    try {
        const formDataObj = new FormData(); 

        formDataObj.append("model_name", formData.model_name);
        formDataObj.append("image", formData.image); 
        formDataObj.append("description", formData.description);
        formDataObj.append("price", formData.price);
        formDataObj.append("contact_info", formData.contact_info);
        formDataObj.append("address", formData.address);

        const response = await fetch(`${BACKEND_URL}/app/features/upload-vehicle`, {
            method: "POST",
            body: formDataObj, 
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) return { error: data };
        return data;
    } catch (err) {
        console.log(err.message);
        return { error: err.message };
    }
}

export default Upload_Vehicle;
