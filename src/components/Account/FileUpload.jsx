import classes from './FileUpload.module.scss';

function FileUpload({name, value, onChange}) {
    return (
        <>
            <input onChange={onChange} type='file' id='profile' name={name} style={{display: 'none'}} />
            
                <div className={classes.container}>
                    <span className={classes.icon}><i className='fa-solid fa-cloud-arrow-up' /></span>
                    <p className={classes.text}>Drag and Drop or <label style={{color: '#FAA61A'}} htmlFor='profile'>Browse</label> to upload</p>
                </div>
            <div className={classes.info}><i className={`fa-solid fa-circle-info`} />Accepted file type include Png, Jpg, JPEG</div>
        </>
    );
}

export default FileUpload;