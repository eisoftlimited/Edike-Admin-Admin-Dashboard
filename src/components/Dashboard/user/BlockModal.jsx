import Modal from "../../UI/Modal";
import blockedicon from './../../../img/blockedicon.svg';

function BlockModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick}) {

    return (
        <Modal title={'Block User'}
            description={'Are you sure you want to block Blossom Johnson? Once blocked, They will no longer have access to their account'}
            cancelText={'No, cancel'}
            confirmText={'Yes, Block'}
            onCloseModal={onCloseModal}
            isModalVisible={isModalVisible}
            icon={blockedicon}
            onConfirmClick={onConfirmClick}
            onCancelClick={onCancelClick}
        />
    );
}

export default BlockModal;