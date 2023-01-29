import Modal from "../../UI/Modal";
import blockLoanIcon from './../../../img/blockedLoanIcon.svg';

function LoanDeclineModal({ onCloseModal, isModalVisible, onConfirmClick, onCancelClick, infoModal }) {
    return (
        <>
            <Modal title={'Decline Loan'}
                description={infoModal}
                cancelText={'No, cancel'}
                confirmText={'Yes, Decline'}
                onCloseModal={onCloseModal}
                isModalVisible={isModalVisible}
                icon={blockLoanIcon}
                onConfirmClick={onConfirmClick}
                onCancelClick={onCancelClick}
            />
        </>
    );
}

export default LoanDeclineModal;