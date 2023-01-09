import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashBoardLayout from "../../components/Dashboard/DashBoardLayout";
import { authActions, loadAdmin } from "../../store/auth/authSlice";

function DashBoardScreen() {
    const auth = useSelector(state => state.auth);

    // console.log({auth});
    const dispatch = useDispatch();

    useEffect(()=> {
        let interval;

        if(auth.token) {
            dispatch(loadAdmin());
        }

        interval = setTimeout(()=> {
            dispatch(authActions.clearErrorState());
        }, 3000);

        return ()=> {
            clearTimeout(interval);
        }

    }, [dispatch, auth.token]);


    return ( 
        <DashBoardLayout />
     );
}

export default DashBoardScreen;