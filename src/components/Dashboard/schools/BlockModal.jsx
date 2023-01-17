import Modal from "../../UI/Modal";
import blockedicon from './../../../img/blockedicon.svg';

function BlockModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick}) {

    return (
        <Modal title={'Block user'}
            description={'Are you sure you want to block Elbethel Schools? Once blocked, Edike Users wont be able to apply for loan with this school?'}
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