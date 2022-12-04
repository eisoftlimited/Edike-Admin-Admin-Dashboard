import classes from './FormControl.module.scss';

function FormControl({ labelText, inputId, inputControls, icon, isValid }) {
    const calculatedVal = !isValid ? '#FAA61A' : '#B2B2B2';

    return (
        <div className={classes['form-control']}>
            <label htmlFor={inputId}
                className={classes['form-control__label']}
                style={{ color: calculatedVal }}
            >{labelText}</label>

            <div className={classes['form-control__inputContainer']}>
                <input id={inputId}
                    style={{
                        color: calculatedVal,
                        borderColor: calculatedVal,
                    }}
                    className={classes['form-control__input']}
                    {...inputControls}
                />
                {icon && <span className={classes['form-control__icon']}>{icon}</span>}
            </div>
        </div>
    );
}

export default FormControl;