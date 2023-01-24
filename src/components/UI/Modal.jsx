import Button from './Button';
import classes from './Modal.module.scss';

function Modal({ title, description, cancelText, confirmText, onCloseModal, isModalVisible, onConfirmClick, onCancelClick, icon, isInfoDetail, infoDetail }) {

    if (isInfoDetail) {
        return (
            <>
                <div className={`${classes.modal} ${isModalVisible ? classes['modal--show'] : ''}`}>
                    {infoDetail}
                </div>
                <div className={`${classes.modal__overlay} ${isModalVisible ? classes['modal__overlay--show'] : ''}`} onClick={onCloseModal}></div>
            </>
        );
    }


    return (
        <>
            <div className={`${classes.modal} ${isModalVisible ? classes['modal--show'] : ''}`}>
                <div className={classes.modal__icon}>
                    <img src={icon} alt='' />
                </div>
                <h2 className={classes.modal__title}>{title}</h2>
                <p className={classes.modal__description}>{description}</p>
                <div className={classes.modal__btns}>
                    <Button outline={true} onClick={onCancelClick}>{cancelText}</Button>
                    <Button onClick={onConfirmClick}>{confirmText}</Button>
                </div>
            </div>
            <div className={`${classes.modal__overlay} ${isModalVisible ? classes['modal__overlay--show'] : ''}`} onClick={onCloseModal}></div>
        </>
    );
}

export default Modal;