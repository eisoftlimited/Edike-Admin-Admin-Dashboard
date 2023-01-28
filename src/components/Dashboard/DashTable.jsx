import classes from './DashTable.module.scss';

function DashTable({children, pagination}) {
    return (
        <div className={classes['table__container']}>
            <table className={classes['table']}>
                <thead>{(children && children[0]) || <tr />}</thead>
                <tbody>{(children && children[1]) || <tr />}</tbody>
            </table>
            {pagination}
        </div>
    );
}

export default DashTable;