import classes from './TopFiveSchools.module.scss';
import school_logo from './../../../img/school_logo.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { EDUKE_URL } from '../../../store/url';
import { toast } from 'react-toastify';
import ToastComponent from '../../UI/ToastComponent';

function TopFiveSchools({ className }) {
    const token = useSelector(state => state.auth.token);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [schools, setSchools] = useState(null);

    useEffect(()=> {
        async function fetchSchools() {
            setLoading(true);
            try {
                const response = await axios({
                    url: `${EDUKE_URL}/edike/api/v1/school/admin/all`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-admin-token': token
                    }
                });

                // console.log(response.data);

                setLoading(false);
                setMsg(response.data && response.data.msg);
                // console.log(response.data);
                setSchools(response.data && response.data.edikeschools.slice(0, 5));
            } catch (err) {
                setLoading(false);
                setError(err.response && err.response.data);
            }
        }

        fetchSchools();

    }, [token]);

    useEffect(() => {
        let interval;

        if (error && error.length > 0) {
            toast.error(<p>{error}</p>);

            interval = setTimeout(() => {
                setError('');
            }, 5000);
        }

        return () => {
            clearTimeout(interval);
        }
    }, [error]);

    function formatName(name) {
        if(name && name.length > 15) {
            return `${name.slice(0, 15)}...`;
        } 

        return name;
    }

    return (
        <>
        <ToastComponent />
        <div className={`${classes['top-five-schools']} ${className ? className : ''}`}>
            <h2>Top 5 School</h2>
            <ul>
                
            {!loading && schools && schools.map(school =>  <li key={school._id}>
                    <div className={classes.item}>
                        <img src={school_logo} alt='' />
                        <div>
                            <div title={school.school_name} className={classes.school}>{school.school_name && formatName(school.school_name)} <span>283</span></div>
                            <p className={classes.email}>{school.email}</p>
                        </div>
                        <span>View</span>
                    </div>
                </li>)}
            </ul>

            <h4>{!loading && !schools && msg}</h4>
        </div>
        </>
    );
}

export default TopFiveSchools;