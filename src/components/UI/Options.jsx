import classes from './Options.module.scss';

function Options({ isRecent, className, onDeleteUser, onEditUser, onBlockUser, onViewUser, status, onActivateUser, isLoan, isCustomer }) {

    if(isRecent) {
        return (
            <ul className={`${classes.options} ${className ? className : ''}`}>
                <li>
                    <div>
                        <button onClick={onViewUser} style={{color: '#333'}}><i className={`far fa-eye`} /> View</button>
                    </div>
                </li>
            </ul>
        )
    }


    return (
        <>
            <ul className={`${classes.options} ${className ? className : ''}`}>
                <li>
                    <div>
                        <button onClick={onViewUser}><i className={`far fa-eye`} /> View</button>
                    </div>
                </li>
                {!isLoan && <li>
                    <div>
                        <button onClick={onEditUser}><i className={`fas fa-pen`} /> Edit</button>
                    </div>
                </li>}
                {status === 'active' &&
                    (<li>
                        <div>
                            <button onClick={onBlockUser}><i className={`fas fa-th-large`} /> Block</button>
                        </div>
                    </li>)
                }
                {isLoan && (<li>
                    <div>
                        <button onClick={onBlockUser}><i className={`fas fa-th-large`} /> Decline</button>
                    </div>
                </li>)
                }
                {isLoan &&
                    (<li>
                        <div>
                            <button onClick={onActivateUser}><i className={`fas fa-th-large`} /> Approve</button>
                        </div>
                    </li>)
                }

                {
                    status === 'blocked' && !isLoan &&
                    (<li>
                        <div>
                            <button onClick={onActivateUser}><i className={`fas fa-th-large`} /> Activate</button>
                        </div>
                    </li>)
                }

                {!isLoan && <li>
                    <div>
                        <button onClick={onDeleteUser}><i className={`fas fa-trash`} /> Delete</button>
                    </div>
                </li>}
            </ul>
            <div className={classes.options__overlay}></div>
        </>
    );
}

export default Options;