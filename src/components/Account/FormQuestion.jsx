import classes from './FormQuestion.module.scss';

export function FormQuestionSmall({children}) {
    return ( 
        <div className={classes['form-question-small']}>{children}</div>
     );
}

function FormQuestion({children}) {
    return ( 
        <div className={classes['form-question']}>{children}</div>
     );
}

export default FormQuestion;