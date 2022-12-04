import classes from './DashBoardMain.module.scss';

function DashBoardMain() {
    return (
        <div className={classes['dashboard-main']}>
            <ul className={classes['dashboard-main__buttons']}>
                <li className={classes['dashboard-main__button']}>All <span>968</span></li>
                <li className={classes['dashboard-main__button']}>Active <span>968</span></li>
                <li className={classes['dashboard-main__button']}>Blocked <span>968</span></li>
                <li className={classes['dashboard-main__button']}>
                    <i className={`fas fa-download`} /> Export <i className={`fas fa-angle-left`} />
                </li>
            </ul>
            <table className={classes['table']}>
                <thead>
                    <tr>
                        <th>School Name</th>
                        <th>Location</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <span />
                                <h3>Elbeth Schools</h3>
                            </div>
                        </td>
                        <td>1, Olaleye Street, Gbagada, La..</td>
                        <td>+234 812 345 6789</td>
                        <td>cooper@example.com</td>
                        <td>
                            <div>
                                <span className={classes['success']}>Active</span>
                                {/* <span className={classes['danger']}>Blocked</span> */}
                                <i className={classes['dots'] + `fas fa-ellipsis-v`} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DashBoardMain;