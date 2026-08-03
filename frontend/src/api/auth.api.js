import api from "./axios";

 export const   login=async(data)=>{
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

