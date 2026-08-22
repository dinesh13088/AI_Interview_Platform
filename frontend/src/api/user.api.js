import api from "./axios";
export const company = async (data, token) => {
    try {
        const fd = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) fd.append(key, value)
        })
        const response = await api.post("companies/api/register/", fd, {
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

export const recruiter=async(data,token)=>{
    try{
        const fd = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) fd.append(key, value)
        })
        const response=await api.post("recruiter/api/register/",fd,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        
        return response

    }
    catch(error)
    {
        console.error("failed to create the recruiter",error)
    }
}

export const jobs=async(data,token)=>{
    try{
        const fd = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) fd.append(key, value)
        })
        const response=await api.post("jobs/api/register/",fd,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        
        return response

    }
    catch(error)
    {
        console.error("failed to create the jobs",error)
    }
}


export const getjobs=async(token)=>{
    try{
       
        const response=await api.get("jobs/api/getjobs/",{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        return response
    }
    catch(error)
    {
        console.error("failed to create the jobs",error)
    }
}