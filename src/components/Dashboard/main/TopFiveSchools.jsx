import classes from './TopFiveSchools.module.scss';
import school_logo from './../../../img/school_logo.svg';

function TopFiveSchools({ className }) {

    return (
        <div className={`${classes['top-five-schools']} ${className ? className : ''}`}>
            <h2>Top 5 School</h2>
            <ul>
                <li>
                    <div className={classes.item}>
                        <img src={school_logo} alt='' />
                        <div>
                            <div className={classes.school}>Elbethel School <span>283</span></div>
                            <p className={classes.email}>elbethel@gmail.com</p>
                        </div>
                        <span>View</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default TopFiveSchools;