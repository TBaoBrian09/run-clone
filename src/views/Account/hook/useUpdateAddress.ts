import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Decrypts } from "config/api/decrypts";
import { URL } from "config/index"
import { HashClient } from "config/api/encrypt";
import useToast from 'hooks/useToast'
import { listError } from "../contants";



export const useUpdateAddress = (account, signature) => {
    const [ pendingUpdate, setPendingUpdate ] = useState(false)
    const [ requestedUpdate, setRequestedUpdate ] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const handleUpdateAddress = useCallback(async () => {
        setPendingUpdate(true)
        
        try {
            // const token = localStorage.getItem('serviceToken');
            const token = Decrypts();
            const hash =  HashClient('user/update-address');
            await axios({
                method: 'PUT', 
                url: `${URL}/user/update-address`, 
                headers:{
                        'Authorization': `Bearer ${token}`,
                        'hash-client': `${hash}`
                    }, 
                    data: {
                        "address": `${account}`,
                        "sign":`${signature}`
                    }
            });
            toastSuccess("Wallet address update successful")
            setRequestedUpdate(true)
        } catch (error:any) {
            const converError = error.response.data.error_code
            console.log(converError)
            if (converError === "ADDRESS_INVALID"){
                toastError("Address invalid")
            }
            if (converError === "ADDRESS_EXISTS"){
                toastError("Address exitst")
            }
            if (converError === "USER_HAD_ADDRESS"){
                toastError("User had address")
            }
            setPendingUpdate(false) 
            setRequestedUpdate(false)
        } 
        finally {
            setPendingUpdate(false)
            setRequestedUpdate(false)
        }
        }, [
            account,
            signature,
            toastError,
            toastSuccess
        ])
    return { handleUpdateAddress, pendingUpdate, requestedUpdate }
}
  