import { useOutletContext } from 'react-router-dom';
import DashBoardNav from '../DashBoardNav';
import classes from './LoanInterest.module.scss'

function LoanInterest() {
    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();




    return (
        <>
            <DashBoardNav
                showSearchNav={false}
                navTitle='Loan Contract'
                onOpenSidebar={openSideBarHandler}
            />
            <div className={classes['loan-interest']}>
                <div className={classes['loan-interest__inner']}>
                    <h2>Loan Interest Rate (Monthly)</h2>

                    <form onSubmit={e => e.preventDefault()} className={classes['interest-form']}>
                        <div className={classes['interest-control']}>
                            <label htmlFor='loanrate'>Rate</label>
                            <div className={classes['input-div']}>
                                <input id='loanrate' type='text' placeholder='e.g 5' />
                                <span>%</span>
                            </div>
                        </div>
                        <button class={classes['interest-btn']}>Update</button>
                    </form>

                    {/* <h2>Rate History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Rate</th>
                                <th>Date Set</th>
                                <th>Set By</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>3.5%</td>
                                <td>10th Oct 2022</td>
                                <td>Blossom Johnson</td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
            </div>
        </>
    );
}

export default LoanInterest;