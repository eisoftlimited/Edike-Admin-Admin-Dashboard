import Modal from "../../UI/Modal";
import blockLoanIcon from './../../../img/blockedLoanIcon.svg';

function LoanDeclineModal({ onCloseModal, isModalVisible, onConfirmClick, onCancelClick }) {
    return (
        <>
            <Modal title={'Decline Loan'}
                description={'Are you sure you want to Decline Abiola Ogunjobi’s loan application for N100,000.00?'}
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