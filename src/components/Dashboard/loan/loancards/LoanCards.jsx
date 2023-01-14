import classes from './LoanCard.module.scss';
import nairaOrange from './../../../../img/nairaOrange.svg';
import nairaGreen from './../../../../img/nairaGreen.svg';
import nairaRed from './../../../../img/nairaRed.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { EDUKE_URL } from '../../../../store/url';


function LoanCard({ state, image, loanType }) {

    const token = useSelector(state => state.auth.token);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState('');

    useEffect(()=> {
        async function getAmount() {
            // console.log({loanType});
            try {
                const response = await axios({
                    url: `${EDUKE_URL}/edike/api/v1/loans/admin/${loanType}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-admin-token': token
                    }
                });

                // console.log(response.data);

                if(response.data.defaultLoans) {
                    setData(response.data.defaultLoans);
                } else if(response.data.completedLoans) {
                    setData(response.data.completedLoans);
                } else if(response.data.pendingLoans) {
                    setData(response.data.pendingLoans);
                } else if(response.data.runningLoans) {
                    setData(response.data.runningLoans);
                }
            } catch (err) {
                // console.log(err.response.data);
                setError(err.response && err.response.data);
            }
        }

        getAmount();
    }, [token]);

    const val = state.charAt(0).toUpperCase() + state.slice(1);

    return (
        <div className={classes['dashboard-loan']}>
            <span className={classes['dashboard-loan__label']}>{val} Loans</span>
            <p className={`${classes['dashboard-loan__amount']} ${classes['dashboard-loan__amount--' + state]}`}>N {`${data}`.length > 0 ? data : 0 }</p>
            <div className={classes['dashboard-loan__icon-box']}>
                <img src={image} alt='' />
            </div>

        </div>
    );
}


function LoanCards() {
    return ( 
        <div className={classes['dashboard-loan__container']}>
            <LoanCard state={'running'} image={nairaOrange} loanType='get-total-running' />
            <LoanCard state={'pending'} image={nairaOrange} loanType='get-total-pending' />
            <LoanCard state={'settled'} image={nairaGreen} loanType='get-total-complete' />
            <LoanCard state={'default'} image={nairaRed} loanType='get-total-default' />
        </div>
     );
}

export default LoanCards;