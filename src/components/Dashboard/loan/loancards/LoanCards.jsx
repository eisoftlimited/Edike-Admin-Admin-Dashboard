import classes from './LoanCard.module.scss';
import nairaOrange from './../../../../img/nairaOrange.svg';
import nairaGreen from './../../../../img/nairaGreen.svg';
import nairaRed from './../../../../img/nairaRed.svg';


function LoanCard({ state, image }) {

    const val = state.charAt(0).toUpperCase() + state.slice(1);

    return (
        <div className={classes['dashboard-loan']}>
            <span className={classes['dashboard-loan__label']}>{val} Loans</span>
            <p className={`${classes['dashboard-loan__amount']} ${classes['dashboard-loan__amount--' + state]}`}>N 10,000,000</p>
            <div className={classes['dashboard-loan__icon-box']}>
                <img src={image} alt='' />
            </div>

        </div>
    );
}


function LoanCards() {
    return ( 
        <div className={classes['dashboard-loan__container']}>
            <LoanCard state={'running'} image={nairaOrange} />
            <LoanCard state={'settled'} image={nairaGreen} />
            <LoanCard state={'default'} image={nairaRed} />
        </div>
     );
}

export default LoanCards;