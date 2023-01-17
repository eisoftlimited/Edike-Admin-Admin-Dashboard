import classes from './AccountFound.module.scss';

function AccountFound({bankDetails}) {
    // console.log(bankDetails.bankDetails.account);
    return ( 
        <div className={classes['account-found']}>
            <span>
                {bankDetails.bankDetails && 'Account Found!'}
                {bankDetails.error.length > 0 && 'Account Not Found!'}
            </span>
            <p>
                {bankDetails.bankDetails && bankDetails.bankDetails.account_name}
                {bankDetails.error.length > 0 && bankDetails.error}
            </p>

            {/* && verifiedBank.bankDetails && */}
            {/* 
                    {!verifiedBank.loading && verifiedBank.error.length > 0 && <p>{verifiedBank.error}</p>} */}
        </div>
     );
}

export default AccountFound;