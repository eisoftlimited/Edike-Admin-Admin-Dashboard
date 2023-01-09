import classes from './FormControl.module.scss';



function FormControl({ labelText, inputId, inputControls, icon, isValid, isSelect, onToggleType }) {
    const calculatedVal = !isValid ? '#FAA61A' : '#B2B2B2';

    

    return (
        <div className={classes['form-control']}>
            <label htmlFor={inputId}
                className={classes['form-control__label']}
                style={{ color: '#B2B2B2' }}
            >{labelText}</label>

            <div className={classes['form-control__inputContainer']}>
                {!isSelect && (<>
                <input id={inputId}
                    style={{
                        color: '#120A00',
                        borderColor: calculatedVal,
                    }}
                    className={classes['form-control__input']}
                    {...inputControls}
                    autoComplete='off'
                />
                
                {icon && <span className={classes['form-control__icon']} onClick={onToggleType}>{icon}</span>}
                </>)}
                {isSelect && <><select className={classes['form-control__input']} {...inputControls}>
                    <option>Name</option>
                    <option>Name</option>
                    <option>Name</option>
                </select>
                {icon && <span className={classes['form-control__icon']}>{icon}</span>}
                </>
                }
                
            </div>
        </div>
    );
}

export default FormControl;