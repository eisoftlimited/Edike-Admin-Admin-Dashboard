import classes from './NotFoundPlaceholder.module.scss';

function NotFoundPlaceholder({title}) {
    return ( 
        <div className={classes['notfound-placeholder']}>
            <h2>No {title}</h2>
            <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
        </div>
     );
}

export default NotFoundPlaceholder;