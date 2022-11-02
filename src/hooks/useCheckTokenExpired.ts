import { Decrypts } from 'config/api/decrypts';
import jwtDecode from 'jwt-decode';
import { useHistory } from "react-router";

const useCheckTokenExpired = () => { 
    const history = useHistory();
    let isExpired = false;
    // const token = localStorage.getItem('serviceToken');
    const token = Decrypts();
    if(token) {
        const decodedToken: any = jwtDecode(token);
        const currentDate = new Date();
        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            localStorage.removeItem('serviceToken');
            localStorage.removeItem('user_info');           
        } else {
            isExpired = true;      
        }
    }
    else {
        isExpired = true;
    }    
}

export default useCheckTokenExpired