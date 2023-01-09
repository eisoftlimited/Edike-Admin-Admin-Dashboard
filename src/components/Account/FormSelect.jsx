import classes from './FormControl.module.scss';

function FormSelect({ options = [], labelText, inputId, inputControls, optionsObject }) {


    // const calculatedVal = !isValid ? '#FAA61A' : '#B2B2B2';

    return (
        <div className={`${classes['form-control']} ${classes['form-select']} `}>
            <label htmlFor={inputId}
                className={classes['form-control__label']}
            // style={{ color: calculatedVal }}
            >{labelText}</label>
            <div className={classes['form-control__inputContainer']}>

                <select className={`${classes['form-control__input']} ${classes['form-select__input']}`}
                    {...inputControls}>

                    {options && options.length !== 0 && options.map(option => <option key={option}>{option}</option>)}

                    {optionsObject &&
                        optionsObject.length !== 0 && <option value={''}>Select Bank</option>}

                    {
                        optionsObject &&
                        optionsObject.length !== 0 &&
                        optionsObject.map(option =>
                            <option key={option.id} value={option.name + '+' + option.code}>{option.name}</option>
                        )}
                </select>


                <span className={`${classes['form-control__icon']} ${classes['form-select__icon']}`}>
                    <i className='fas fa-angle-down' />
                </span>
            </div>
        </div>
    );
}

export default FormSelect;



/*
<SelectInput
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    // getOptionValue={option => {
                    //     onChange(option.value)
                    // }}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'grey' : 'grey',
                            outline: 'none'
                        }),
                    }}
                    placeholder={placeholder}
                    options={options} />

*/ 