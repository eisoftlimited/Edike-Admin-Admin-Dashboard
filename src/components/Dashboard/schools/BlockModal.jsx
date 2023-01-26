import Modal from "../../UI/Modal";
import blockedicon from './../../../img/blockedicon.svg';

function BlockModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick, infoModal}) {

    return (
        <Modal title={'Block user'}
            description={infoModal && infoModal.msg}
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