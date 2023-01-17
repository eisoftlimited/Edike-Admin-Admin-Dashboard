import Modal from "../../UI/Modal";
import deleteicon from './../../../img/deleteicon.svg';


function DeleteModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick}) {
    return (
        <Modal title={'Delete user'}
            description={'Are you sure you want to delete Blossom Johnson? If you proceed,  their details will be deleted entirely from the platform'}
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