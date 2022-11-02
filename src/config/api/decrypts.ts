import CryptoJS from "crypto-js";

const saltHass = process.env.REACT_APP_API_KEYCRYPT
// eslint-disable-next-line consistent-return
export const Decrypts = ()=>{
  if(localStorage.getItem("serviceToken")){
    try {
      const decrypted = CryptoJS?.AES?.decrypt(localStorage?.getItem("serviceToken"), `${saltHass}`).toString(CryptoJS?.enc?.Utf8).replace(/["']/g, "")
      return decrypted;
    }
    catch(error) {
      localStorage.removeItem('serviceToken');    
      console.log(error)
    }
   
  }
  }
// eslint-disable-next-line consistent-return
export const DecryptsUserInfo = ()=>{
  if(localStorage.getItem("user_info")){
    try {
      const decrypted = CryptoJS?.AES?.decrypt(localStorage?.getItem("user_info"), `${saltHass}`).toString(CryptoJS?.enc?.Utf8) 
      return JSON.parse(decrypted);
    }
    catch(error) {
      localStorage.removeItem('user_info');    
      console.log(error)
    }
   
  }
  }
  