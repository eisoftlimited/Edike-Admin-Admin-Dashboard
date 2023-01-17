import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function LoggedInScreen({children}) {
    
    const auth = useSelector(state => state.auth);
    const localtoken = localStorage.getItem('edike-admin-token');

    if(!!auth.token === false && !!localtoken === false) {
        return <Navigate to='/sign-in' />
    }
    
    // if(!!auth.token === false || auth.error === 'Not Authorized') {
    //     return <Navigate to='/sign-in' />
    // }
    
    return children;
}

export default LoggedInScreen;