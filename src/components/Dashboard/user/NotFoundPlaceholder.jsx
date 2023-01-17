import classes from './NotFoundPlaceholder.module.scss';

function NotFoundPlaceholder({title, children}) {
    return ( 
        <div className={classes['notfound-placeholder']}>
            <h2>No {title}</h2>
            <p>{children}</p>
        </div>
     );
}

export default NotFoundPlaceholder;