import { configureStore } from '@reduxjs/toolkit';
import { bankListReducer } from './accountNum/listBanksSlice';
import { verifyAccNumberReducer } from './accountNum/verifyAccountNumberSlice';
import { authReducer } from './auth/authSlice';
import { activateUserReducer } from './customer/activateUserSlice';
import { addUserReducer } from './customer/addUserSlice';
import { blockUserReducer } from './customer/blockUserSlice';
import { deleteUserReducer } from './customer/deleteCustomerSlice';
import { getAllUsersReducer } from './customer/getAllUserSlice';
import { approveLoanReducer } from './loan/approveLoanSlice';
import { completeLoanReducer } from './loan/completeLoanSlice';
import { declineDueCardReducer } from './loan/declineDueToCard';
import { declineLoanReducer } from './loan/declineLoanSlice';
import { getLoansReducer } from './loan/getAllLoansSlice';
import { getLoanReducer } from './loan/getLoanSlice';
import { activateCustomerReducer } from './realCustomers/activateCustomerSlice';
import { blockCustomerReducer } from './realCustomers/blockCustomerSlice';
import { getAllCustomersReducer } from './realCustomers/getAllCustomersSlice';
import { activateSchoolReducer } from './schools/activateSchoolSlice';
import { blockSchoolReducer } from './schools/blockSchoolSlice';
import { createSchoolReducer } from './schools/createSchoolSlice';
import { deleteSchoolReducer } from './schools/deleteSchool';
import { updateSchoolReducer } from './schools/editSchool';
import { getSchoolsReducer } from './schools/getAllSchoolSlice';
import { getSchoolReducer } from './schools/getSchoolSlice';
import { transactionsReducer } from './transaction/getTransactionsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // SCHOOL SLICES
        createSchool: createSchoolReducer,
        getSchools: getSchoolsReducer,
        getSchool: getSchoolReducer,
        updateSchool: updateSchoolReducer,
        deleteSchool: deleteSchoolReducer,
        blockSchool: blockSchoolReducer,
        activateSchool: activateSchoolReducer,
        // BANK SLICES
        getBanks: bankListReducer,
        verifyBank: verifyAccNumberReducer,
        // USER/CUSTOMER SLICES
        createUser: addUserReducer,
        getAllUsers: getAllUsersReducer,
        deleteUser: deleteUserReducer,
        blockUser: blockUserReducer,
        activateUser: activateUserReducer,
        // LOAN SLICES
        getAllLoans: getLoansReducer,
        getSingleLoan: getLoanReducer,
        approveLoan: approveLoanReducer,
        declineLoan: declineLoanReducer,
        declineDueCard: declineDueCardReducer,
        completeLoan: completeLoanReducer,
        // CUSTOMERS SLICES
        getAllCustomers: getAllCustomersReducer,
        blockCustomer: blockCustomerReducer,
        activateCustomer: activateCustomerReducer,
        // TRANSACTIONS SLICES
        getAllTransactions: transactionsReducer

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})


export default store;

