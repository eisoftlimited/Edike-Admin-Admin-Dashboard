import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashBoardAside from './DashBoardAside';
import classes from './DashBoardLayout.module.scss';
// import DashBoardNav from './DashBoardNav';

function DashBoardLayout() {

    const [showSidebar, setShowSidebar] = useState(false);

    const openSideBarHandler = ()=> {
        setShowSidebar(true);
    };

    const closeSideBarHandler = ()=> {
        setShowSidebar(false);
    };


    return ( 
        <div className={classes['dashboard-layout']}>
            <div className={`${classes['dashboard-layout__aside']} ${ showSidebar ? classes['active'] : ''}`}>
                <DashBoardAside onSidebarClose={closeSideBarHandler} />
            </div>
            <div className={`${classes['sidebar-overlay']} ${showSidebar ? classes.overlay__show : ''}`} onClick={closeSideBarHandler} />
            {/* {false && <div className={classes['dashboard-layout__nav']}>
                <DashBoardNav onOpenSidebar={openSideBarHandler} />
            </div>} */}
            <div className={classes['dashboard-layout__main']}>
                <Outlet context={[openSideBarHandler]}  />
            </div>
        </div>
     );
}

export default DashBoardLayout;