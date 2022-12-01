import classes from './FormQuestion.module.scss';

export function FormQuestionSmall({children}) {
    return ( 
        <p className={classes['form-question-small']}>{children}</p>
     );
}

function FormQuestion({children}) {
    return ( 
        <p className={classes['form-question']}>{children}</p>
     );
}

export default FormQuestion;