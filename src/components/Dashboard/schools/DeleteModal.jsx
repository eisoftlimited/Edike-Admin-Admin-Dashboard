import Modal from "../../UI/Modal";
import deleteicon from './../../../img/deleteicon.svg';


function DeleteModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick, infoModal}) {
    return (
        <Modal title={'Delete user'}
            description={infoModal && infoModal.msg}
            cancelText={'No, cancel'}
            confirmText={'Yes, Delete'}
            onCloseModal={onCloseModal}
            isModalVisible={isModalVisible}
            onCancelClick={onCancelClick}
            onConfirmClick={onConfirmClick}
            icon={deleteicon}
        />
    );
}

export default DeleteModal;