import classes from './MainChart.module.scss';

function MainChart({className}) {
    return ( 
        <div className={`${classes['main-chart']} ${className ? className : ''}`}>
            <h2>Customers Growth</h2>
        </div>
     );
}

export default MainChart;