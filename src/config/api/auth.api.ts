import axios from "axios";
import axiosconfig from "./configHttp";
import { HashClient } from "./encrypt";


const headerRegister = {
   'hash-client': HashClient('auth/register')
 }
 
const headersendotp = {
   'hash-client': HashClient('auth/get-verify-email-code')
 }
const headersendotpForgot = {
   'hash-client': HashClient('auth/get-verify-forgot-password')
 }
const headerforgotPassword = {
   'hash-client': HashClient('auth/forgot-password')
 }
const headerLogin = {
   'hash-client': HashClient('auth/login')
 }

const authAPI={
     register(data) {
         const datas= axiosconfig.post(`/auth/register`,data,{headers: headerRegister}); 
         return datas;
     },
     sendotp(data) {
        const datas= axiosconfig.post(`/auth/get-verify-email-code`,data,{headers: headersendotp}); 
        return datas;
     },
     sendotpForgot(data) {
        const datas= axiosconfig.post(`/auth/get-verify-forgot-password`,data,{headers: headersendotpForgot}); 
        return datas;
     },
     forgotPassword(data) {
      const datas= axiosconfig.post(`/auth/forgot-password`,data,{headers: headerforgotPassword}); 
      return datas;
  },
     login(data){
        const datas= axiosconfig.post(`/auth/login`,data,{headers: headerLogin});         
        return datas;
     },   
}

export default authAPI;
