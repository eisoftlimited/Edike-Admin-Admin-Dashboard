import classes from './FormControl.module.scss';

function FormControl({ labelText, inputId, inputControls, icon }) {
    return (
        <div className={classes['form-control']}>
            <label htmlFor={inputId} className={classes['form-control__label']}>{labelText}</label>

            <div className={classes['form-control__inputContainer']}>
                <input id={inputId}
                    className={classes['form-control__input']}
                    {...inputControls}
                />
                {icon && <span className={classes['form-control__icon']}>{icon}</span>}
            </div>
        </div>
    );
}

export default FormControl;