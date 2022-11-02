
import { ethers } from "ethers";
import React, { useCallback, useState } from "react";

export const useSign = (nonceCode) => {
    const [ pendingSign, setPendingSign ] = useState(false)
    const [ signatureKey, setSignatureKey ] = useState("")
   
    const handleSign = useCallback(async () => {
      setPendingSign(true)
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const message = `Runtogether sign ${nonceCode}`
        const signer = provider.getSigner();
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
  
