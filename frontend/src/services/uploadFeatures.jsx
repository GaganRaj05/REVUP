const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const uploadFeature = async(formData, type)=> {
    try {
        if(type === "Post") {
            const response = await fetch(`${BACKEND_URL}/features/upload-post`,{
                method:"POST",
                body:formData,
                credentials:'include'
            });
            const data = await response.json();
            if(!response.ok) return {error:data};
            return data;
        }
        else if(type === "Event") {
            const response = await fetch(`${BACKEND_URL}/features/upload-event`,{
                method:"POST",
                
                body:formData,

                credentials:'include'
            });
            const data = await response.json();
            if(!response.ok) return {error:data};
            return data;
        }
        else {
            const response = await fetch(`${BACKEND_URL}/features/upload-vehicle`,{
                method:"POST",
                
                body:formData,
                credentials:'include'
            });
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

export default uploadFeature;