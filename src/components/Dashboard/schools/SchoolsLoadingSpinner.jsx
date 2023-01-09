import {RotatingLines} from 'react-loader-spinner';

import classes from './SchoolsLoadingSpinner.module.scss';

function SchoolsLoadingSpinner() {
    return (
        <div className={classes['loading-spinner']}>
            <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
        </div>

    );
}

export default SchoolsLoadingSpinner;