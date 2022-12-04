import classes from './DashBoardAside.module.scss';


function DashMenuItem({ icon, text, link = '#a' }) {
    return (
        <li className={classes['dashboard-menu__item']}>
            <a href={link} className={classes['dashboard-menu__link']}>
                <span className={classes['dashboard-menu__link-icon']}>
                    {icon}
                </span>
                <span className={classes['dashboard-menu__link-text']}>
                    {text}
                </span>
            </a>
        </li>
    );
}

function DashBoardAside() {
    return (
        <>
            <div className={classes['logo']}>Edike</div>
            <ul className={classes['dashboard-menu']}>
                <DashMenuItem
                    text={'Dashboard'}
                    icon={<i className={`fas fa-columns`} />}
                />
                <DashMenuItem
                    text={'Schools'}
                    icon={<i className={`fal fa-university`} />}
                />
                <DashMenuItem
                    text={'Debit Cards'}
                    icon={<i className={`fas fa-columns`} />}
                />
                <DashMenuItem
                    text={'Fees Payment'}
                    icon={<i className={`fas fa-columns`} />}
                />
                <DashMenuItem
                    text={'Users'}
                    icon={<i className={`fas fa-columns`} />}
                />
            </ul>
        </>
    );
}

export default DashBoardAside;