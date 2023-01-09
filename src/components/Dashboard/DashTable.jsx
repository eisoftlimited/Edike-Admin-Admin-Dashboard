import classes from './DashTable.module.scss';

function DashTable({children, pagination}) {
    return (
        <div className={classes['table__container']}>
            <table className={classes['table']}>
                <thead>{(children && children[0]) || ''}</thead>
                <tbody>{(children && children[1]) || ''}</tbody>
            </table>
            {pagination}
        </div>
    );
}

export default DashTable;