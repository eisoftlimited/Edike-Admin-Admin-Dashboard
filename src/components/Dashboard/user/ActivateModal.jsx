import Modal from "../../UI/Modal";
import blockedicon from './../../../img/blockedicon.svg';

function ActivateModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick}) {

    return (
        <Modal title={'Activate school'}
            description={'Are you sure you want to activate Elbethel Schools? Once activated, Edike Users wont be able to apply for loan with this school?'}
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