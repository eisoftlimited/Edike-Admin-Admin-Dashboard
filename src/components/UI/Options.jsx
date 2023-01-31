import classes from './Options.module.scss';
import Wall from './../../img/Wall.svg';
import Delete from './../../img/Delete.svg';

function Options({ isRecent, isUser, className, onDeleteUser, onEditUser, onBlockUser, onViewUser, status, onActivateUser, isLoan, isCustomer }) {

    function menuHandler(e) {
        console.log('Menu Item Clicked')
    }


    if (isRecent) {
        return (
            <>
                <ul className={`${classes.options} ${className ? className : ''}`}>
                    <li>
                        <div>
                            <button onClick={onViewUser} style={{ color: '#333' }}><i className={`far fa-eye`} /> View</button>
                        </div>
                    </li>
                    <li>
                        <div>
                            <button style={{ display: 'flex', alignItems: 'center' }} onClick={onBlockUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Decline
                            </button>
                        </div>
                    </li>
                    <li>
                        <div style={{ justifyContent: 'flex-start' }}>
                            <button style={{ display: 'flex', alignItems: 'center', color: '#111' }} onClick={onActivateUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Activate
                            </button>
                        </div>
                    </li>
                </ul>
                {/* <div className={classes.options__overlay}></div> */}
            </>
        )
    }

    if (isUser) {
        return (
            <>
                <ul className={`${classes.options} ${className ? className : ''}`} onClick={menuHandler}>
                    <li>
                        <div>
                            <button onClick={onBlockUser}><i className={`fas fa-th-large`} /> Block</button>
                        </div>
                    </li>
                    <li>
                        <div>
                            <button style={{ display: 'flex', alignItems: 'center' }} onClick={onActivateUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Activate
                            </button>
                        </div>
                    </li>
                    <li>
                        <div>
                            <button onClick={onDeleteUser}><i className={`fas fa-trash`} /> Delete</button>
                        </div>
                    </li>
                </ul>
                {/* <div className={classes.options__overlay}></div> */}
                {/* <div className={classes.options__overlay} style={{display: 'none'}} onClick={e=> {
                    e.currentTarget.style.display = 'none';
                    if(e.currentTarget.previousElementSibling) e.currentTarget.previousElementSibling.style.display = 'none';
                }}></div> */}
            </>
        );
    }

    if (isLoan) { // Delete
        return (
            <>
                <ul className={`${classes.options} ${className ? className : ''}`} onClick={menuHandler}>
                    <li>
                        <div style={{ justifyContent: 'flex-start' }}>
                            <button onClick={onViewUser}><i className={`far fa-eye`} style={{ width: '2rem', marginRight: '.7rem' }} /> View</button>
                        </div>
                    </li>
                    <li>
                        <div style={{ justifyContent: 'flex-start' }}>
                            <button style={{ display: 'flex', alignItems: 'center', color: '#FF3436' }} onClick={onBlockUser}>
                                <img src={Delete} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Decline
                            </button>
                        </div>
                    </li>
                    <li>
                        <div style={{ justifyContent: 'flex-start' }}>
                            <button style={{ color: '#111', display: 'flex', alignItems: 'center' }} onClick={onActivateUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Approve
                            </button>
                        </div>
                    </li>
                </ul>
                {/* <div className={classes.options__overlay}></div> */}
            </>
        );
    }

    if (isCustomer) {
        return (
            <>
                <ul className={`${classes.options} ${className ? className : ''}`} onClick={menuHandler}>
                    <li>
                        <div style={{ justifyContent: 'flex-start' }}>
                            <button onClick={onViewUser}><i className={`far fa-eye`} style={{ width: '2rem', marginRight: '.7rem' }} /> View</button>
                        </div>
                    </li>
                    <li>
                        <div style={{ justifyContent: 'flex-start' }}>
                            <button style={{ display: 'flex', alignItems: 'center', color: '#111' }} onClick={onBlockUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Block
                            </button>
                        </div>
                    </li>
                    <li>
                        <div style={{ justifyContent: 'flex-start' }}>
                            <button style={{ display: 'flex', alignItems: 'center', color: '#111' }} onClick={onActivateUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Activate
                            </button>
                        </div>
                    </li>
                    {/* <li>
                    <div style={{ justifyContent: 'flex-start' }}>
                        <button style={{ display: 'flex', alignItems: 'center', color: '#FF3436' }} onClick={onDeleteUser}>
                            <img src={Delete} alt='' style={{ width: '2rem', marginRight: '.7rem' }} /> Delete
                        </button>
                    </div>
                </li> */}
                </ul>
                {/* <div className={classes.options__overlay}></div> */}
            </>
        );
    }


    return (
        <>
            <ul className={`${classes.options} ${className ? className : ''}`} onClick={menuHandler}>
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
                            {/* <button onClick={onBlockUser}><i className={`fas fa-th-large`} /> Block</button> */}
                            <button style={{ display: 'flex', alignItems: 'center' }} onClick={onBlockUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Block
                            </button>
                        </div>
                    </li>)
                }
                {isLoan && (<li>
                    <div>
                        {/* <button onClick={onBlockUser}><i className={`fas fa-th-large`} /> Decline</button> */}
                        <button style={{ display: 'flex', alignItems: 'center' }} onClick={onBlockUser}>
                            <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Decline
                        </button>
                    </div>
                </li>)
                }
                {isLoan &&
                    (<li>
                        <div>
                            {/* <button onClick={onActivateUser}><i className={`fas fa-th-large`} /> Approve</button> */}

                            <button style={{ display: 'flex', alignItems: 'center' }} onClick={onActivateUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Approve
                            </button>
                        </div>
                    </li>)
                }

                {
                    status === 'blocked' && !isLoan &&
                    (<li>
                        <div>
                            {/* <button onClick={onActivateUser}><i className={`fas fa-th-large`} /> Activate</button> */}
                            <button style={{ display: 'flex', alignItems: 'center' }} onClick={onActivateUser}>
                                <img src={Wall} alt='' style={{ width: '2rem', marginRight: '.7rem' }} />Activate
                            </button>
                        </div>
                    </li>)
                }

                {!isLoan && <li>
                    <div>
                        <button onClick={onDeleteUser}><i className={`fas fa-trash`} /> Delete</button>
                    </div>
                </li>}
            </ul>
            {/* <div className={classes.options__overlay}></div> */}
        </>
    );
}

export default Options;