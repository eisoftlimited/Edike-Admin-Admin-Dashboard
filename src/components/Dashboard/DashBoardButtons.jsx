
import classes from './DashBoardButtons.module.scss';


function ExportBtn({onExportTable}) {
    return (
        <li className={`${classes['dashboard-main__button']} ${classes['export']}`} onClick={onExportTable}>
            <i className={`fas fa-download`} /> Export <i className={`fas fa-angle-left`} />
        </li>
    );
}

function DashBoardButtons({onExportTable, onAll, onActive, onBlocked, allAmount, activeAmount, blockedAmount}) {
    return (
        <>
            <ul className={`${classes['dashboard-main__buttons']} ${classes['dashboard-main__buttons--mobile']}`}>
                <ExportBtn onExportTable={onExportTable} />
            </ul>
            <ul className={classes['dashboard-main__buttons']}>
                <li className={classes['dashboard-main__button']} onClick={onAll}>All <span>{allAmount}</span></li>
                <li className={classes['dashboard-main__button']} onClick={onActive}>Active <span>{activeAmount}</span></li>
                <li className={classes['dashboard-main__button']} onClick={onBlocked}>Blocked <span>{blockedAmount}</span></li>
                <ExportBtn onExportTable={onExportTable} />
            </ul>
        </>
    );
}

export default DashBoardButtons;