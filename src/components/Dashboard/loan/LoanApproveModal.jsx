import Modal from "../../UI/Modal";
import loanActivateIcon from './../../../img/loanActivateIcon.svg';

function LoanApproveModal({onCloseModal, isModalVisible, onConfirmClick, onCancelClick}) {
    return ( 
        <>
        <Modal title={'Approve Loan'}
            description={'Are you sure you want to Approve Abiola Ogunjobi’s loan application for N100,000.00?'}
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