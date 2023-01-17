import classes from './FormControl.module.scss';

function FormPhone({ labelText, inputId, inputControls, isValid }) {
    const calculatedVal = !isValid ? '#FAA61A' : '#B2B2B2';

    return (
        <div className={`${classes['form-control']} ${classes['form-phone']} `}>
            <label htmlFor={inputId}
                className={classes['form-control__label']}
                style={{ color: '#B2B2B2' }}
            >{labelText}</label>

            <div className={classes['form-control__inputContainer']}>
                <input id={inputId}
                autoComplete='off'
                    style={{
                        color: '#120A00',
                        borderColor: calculatedVal,
                    }}
                    className={`${classes['form-control__input']} ${classes['form-phone__input']}`}
                    {...inputControls}
                />
                {/* <span className={classes['form-phone__prefix']}>+234</span> */}
            </div>
        </div>
    );
}

export default FormPhone;