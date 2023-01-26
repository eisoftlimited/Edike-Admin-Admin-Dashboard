import Modal from "../../UI/Modal";
import blockedicon from './../../../img/blockedicon.svg';

function ActivateModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick, infoModal}) {

    return (
        <Modal title={'Activate school'}
            description={infoModal && infoModal.msg}
            cancelText={'No, cancel'}
            confirmText={'Yes, Activate'}
            onCloseModal={onCloseModal}
            isModalVisible={isModalVisible}
            icon={blockedicon}
            onConfirmClick={onConfirmClick}
            onCancelClick={onCancelClick}
        />
    );
}

export default ActivateModal;