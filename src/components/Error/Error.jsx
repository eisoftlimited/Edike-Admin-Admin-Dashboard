import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './Error.module.scss';
import edikeLogo from './../../img/edike-logo.svg';
import questionMark from './../../img/question-mark.svg';
import errorImg from './../../img/404.svg';

function Error() {

    const token = useSelector(state => state.auth.token);


    return ( 
        <div className={classes['error']}>
            <div className={classes['error-nav']}>
                <div className={classes['error-nav__logo']}>
                    <img src={edikeLogo} alt='Edike' />
                </div>
                <div className={classes['error-nav__feedback']}><img src={questionMark} alt='Question Mark' /> Feedback and Help</div>
            </div>
            <div className={classes['error-container']}>
                <div className={classes['error-col']}>
                    <span>404 Page</span>
                    <h3>Page not found</h3>
                    <p>You don’t have access the permissions to view this page. Please contact support for more information.</p>
                    <Link to={token ? '/dashboard' : '/sign-in'}>Go to Dashboard</Link>
                    <a href='#a' className={`text`}>Contact Support</a>
                </div>
                <div className={classes['error-col']}>
                    <img src={errorImg} alt='' />
                </div>
            </div>
        </div>
     );
}

export default Error;