import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials:true
});
  
api.interceptors.request.use(
async (config) => {

    if (config.url.includes("/login") || config.url.includes("/signup")) {
        return config;
    }

    let token = localStorage.getItem('token'); 
    console.log(token)
    if(!token){
        try {
            const res=await axios.post("http://localhost:3000/user/refresh",{},{withCredentials:true})
            token=res.data.token
            localStorage.setItem("token",token)
            console.log(token)
        } catch (error) {
            console.log("session expired, logging out")
            return null
        }
    }

    config.headers.token = token

    return config
},
(error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response)=>response,

    async(error)=>{
        const originalRequest=error.config

        if(error.response.status===401 && !originalRequest){
            originalRequest._retry=true
            try {
                const token = await axios.post("http://localhost:5000/user/refresh", {}, { withCredentials: true });
                localStorage.setItem("token",token)

                originalRequest.headers.token=token
                return api.request(originalRequest)
            } catch (error) {
                console.log("refresh token expired")
            }
        }
        return Promise.reject(error)
    }
)
  
export default api