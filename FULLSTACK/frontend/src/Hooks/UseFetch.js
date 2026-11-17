import axios from "axios";
import { useState, useEffect } from "react";
import {toast} from "react-toastify";

//Creacion custom hook
export function useFetch() {
    //Crear loading 
    const [loading, setLoading] = useState(false);
    //Crear el auto
    const fetchDataBackend = async (url, data=null , method="GET", headers={}) =>{
        const loadingToast = toast.loading("Procesando solicitud...");
        setLoading(true);
        try{
            const response = await axios({
                method: method,
                url: url,
                headers:{
                    "Content-Type": "application/json",
                    ...headers
                },
                data: data,
                }) 
                toast.dismiss(loadingToast);
                toast.success(response?.data?.msg);
                return response?.data;
            }
        catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.response?.data?.msg || "Ocurrio un error inesperado.");
            console.log(error);
        } 
        finally{
            setLoading(false);
        }
    }

    return{fetchDataBackend, loading}


}