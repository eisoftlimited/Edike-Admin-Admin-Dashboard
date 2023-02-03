import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoggedInScreen({ children }) {


    const auth = useSelector(state => state.auth);
    const localtoken = localStorage.getItem('edike-admin-token');
    const navigate = useNavigate();

    // i just added this part oo incase of error
    useEffect(() => {
        const checkInactivity = () => {
            let timeout;
            function checkActivity() {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
    
                    localStorage.removeItem('edike-admin-token');
                    navigate('/sign-in');
    
                }, 1800000);
            }
            document.addEventListener('keydown', checkActivity);
            document.addEventListener('mousedown', checkActivity);
            document.addEventListener('mousemove', checkActivity);
            checkActivity();
        }
        checkInactivity();
    }, [navigate]);
    // end part

    if (!!auth.token === false && !!localtoken === false) {
        return <Navigate to='/sign-in' />
    }

    // if(!!auth.token === false || auth.error === 'Not Authorized') {
    //     return <Navigate to='/sign-in' />
    // }

    return children;
}

export default LoggedInScreen;