import FormControl from '../Account/FormControl';
import FormDescription from '../Account/FormDescription';
import FormHeading from '../Account/FormHeading';
import classes from './DashDrawer.module.scss';

function DashDrawer() {
    return (
        <div className={classes['dashdrawer']}>
            <FormHeading className={classes['dashdrawer__heading']}>Edit Beneficiary</FormHeading>
            <FormDescription className={classes['dashdrawer__description']}>Edit beneficiary details.</FormDescription>
            <form>
                <div className={classes['form-grid']}>
                    <FormControl
                        inputId={'firstName'}
                        labelText={'First Name'}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Enter first name here...',
                            value: ''
                        }} />
                    <FormControl
                        inputId={'lastname'}
                        labelText={'Last Name'}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Enter last name here...',
                            value: ''
                        }} />
                    <FormControl
                        isSelect={true}
                        inputId={'schoolName'}
                        labelText={'Name of School'}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Please select',
                            value: ''
                        }} />
                    <FormControl
                        isSelect={true}
                        inputId={'className'}
                        labelText={'Class'}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Please select',
                            value: ''
                        }} />
                    <FormControl
                        isSelect={true}
                        inputId={'gender'}
                        labelText={'Gender'}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Please select',
                            value: ''
                        }} />

                    <FormControl
                        inputId={'date'}
                        isSelect={true}
                        labelText={'Date of Birth'}
                        inputControls={{
                            placeholder: 'Please select',
                            value: ''
                        }} />
                    <FormControl
                        inputId={'month'}
                        isSelect={true}
                        labelText={' '}
                        inputControls={{
                            placeholder: 'Please select',
                            value: ''
                        }} />
                    <FormControl
                        inputId={'year'}
                        isSelect={true}
                        labelText={' '}
                        inputControls={{
                            placeholder: 'Please select',
                            value: ''
                        }} />
                    <FormControl
                        labelText={' '}
                        inputControls={{
                            type: 'hidden',
                            placeholder: 'Please select',
                            value: ''
                        }} />
                    <div className={classes['dashdrawer-btns']}>
                        <button className={`${classes['dashdrawer-btn']} ${classes['dashdrawer-btn--outline']}`}>Cancel</button>
                        <button className={`${classes['dashdrawer-btn']} ${classes['dashdrawer-btn--fill']}`}>Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DashDrawer;