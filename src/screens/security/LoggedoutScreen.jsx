import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function LoggedOutScreen({children}) {
    
    const auth = useSelector(state => state.auth);
    const localtoken = localStorage.getItem('edike-admin-token');

    // (!!auth.token === false && !!localtoken === false) || auth.error === 'Not Authorized'

    if((!!auth.token === true && !!localtoken === true) && auth.error !== 'Not Authorized') {
        return <Navigate to='/dashboard' />
    }
    
    return children;
}

export default LoggedOutScreen;