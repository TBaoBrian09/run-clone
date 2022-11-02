
import { ethers } from "ethers";
import React, { useCallback, useState } from "react";
import { simpleRpcProvider } from "utils/providers";

export const useSign = (nonceCode) => {
    const [ pendingSign, setPendingSign ] = useState(false)
    const [ signatureKey, setSignatureKey ] = useState("")
   
    const handleSign = useCallback(async () => {
      setPendingSign(true)
      try {
        const message = `Runtogether sign ${nonceCode}`
        const signer = simpleRpcProvider.getSigner();
        const signature = await signer.signMessage(message)
        if (signature){
            setSignatureKey(signature)
            setPendingSign(false)
        }
      } catch (e) {
        console.error(e)
        setPendingSign(false)
      } finally {
        setPendingSign(false)
      }
    }, [
        nonceCode
    ])
   
  
    return { handleSign, signatureKey, pendingSign }
  }
  
