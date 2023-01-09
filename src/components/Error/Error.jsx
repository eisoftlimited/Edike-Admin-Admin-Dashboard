import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './Error.module.scss';

function Error() {

    const token = useSelector(state => state.auth.token);


    return ( 
        <div className={classes['error']}>
            <div className={classes['error-nav']}>
                <div className={classes['error-nav__logo']}>Edu Loan</div>
                <div className={classes['error-nav__feedback']}>Feedback and Help</div>
            </div>
            <div className={classes['error-container']}>
                <div className={classes['error-col']}>
                    <span>404 Page</span>
                    <h3>Page not found</h3>
                    <p>You don’t have access the permissions to view this page. Please contact support for more information.</p>
                    <Link to={token ? '/dashboard/schools' : '/sign-in'}>Go to Dashboard</Link>
                    <a href='#a' className={`text`}>Contact Support</a>
                </div>
                <div className={classes['erro-col']}></div>
            </div>
        </div>
     );
}

export default Error;