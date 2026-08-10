import api from "./axios";

 export const login=async(data)=>{
    try{
        const response = await api.post("account/api/login/", data)
        console.log(response)
        return response

    }
    catch(err){
        console.error("login api error",err)
        throw err
    }
    
}

export const create=async(data)=>{
    try{
        const response=await api.post("account/api/register/",data)
        console.log(response)
        return response

    }
    catch(error)
    {
        console.error("failed to create the account",error)
    }
}
export const createCandidate = async (data, token) => {
    try {
        const fd = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) fd.append(key, value)
        })
        const response = await api.post("candidate/api/create/", fd, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        return response
    } catch (error) {
        console.error("failed to create candidate account:", error.response?.data)
        throw error
    }
}