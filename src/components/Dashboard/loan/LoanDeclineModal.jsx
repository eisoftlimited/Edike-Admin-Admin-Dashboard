import Modal from "../../UI/Modal";
import blockLoanIcon from './../../../img/blockedLoanIcon.svg';

function LoanDeclineModal({ onCloseModal, isModalVisible, onConfirmClick, onCancelClick, loanInfo, isComplete }) {

    let description = `Are you sure you want to Decline ${loanInfo && loanInfo.user}’s loan application for N${loanInfo && loanInfo.amount}?`;

    if(isComplete) {
        description = `Are you sure you want to Complete ${loanInfo && loanInfo.user}’s loan application for N${loanInfo && loanInfo.amount}?`;
    }


    return (
        <>
            <Modal title={isComplete ? 'Complete Loan' : 'Decline Loan'}
                description={description}
                cancelText={'No, cancel'}
                confirmText={isComplete ? 'Yes, Complete' : 'Yes, Decline'}
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