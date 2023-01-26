import Modal from "../../UI/Modal";
import loanActivateIcon from './../../../img/loanActivateIcon.svg';

function LoanApproveModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick, loanInfo}) {
    return ( 
        <>
        <Modal title={'Approve Loan'}
            description={`Are you sure you want to Approve ${loanInfo && loanInfo.user}’s loan application for N${loanInfo && loanInfo.amount}?`}
            cancelText={'No, cancel'}
            confirmText={'Yes, Approve'}
            onCloseModal={onCloseModal}
            isModalVisible={isModalVisible}
            icon={loanActivateIcon}
            onConfirmClick={onConfirmClick}
            onCancelClick={onCancelClick}
        />
        </>
     );
}

export default LoanApproveModal;