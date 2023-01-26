import Modal from "../../UI/Modal";
import blockLoanIcon from './../../../img/blockedLoanIcon.svg';

function LoanDeclineModal({ onCloseModal, isModalVisible, onConfirmClick, onCancelClick, loanInfo }) {
    return (
        <>
            <Modal title={'Decline Loan'}
                description={`Are you sure you want to Decline ${loanInfo && loanInfo.user}’s loan application for N${loanInfo && loanInfo.amount}?`}
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