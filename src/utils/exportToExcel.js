import xlsx from "json-as-xlsx";

// let data = [
//   {
//     sheet: "Adults",
//     columns: [
//       { label: "User", value: "user" }, // Top level data
//       { label: "Age", value: (row) => row.age + " years" }, // Custom format
//       { label: "Phone", value: (row) => (row.more ? row.more.phone || "" : "") }, // Run functions
//     ],
//     content: [
//       { user: "Andrea", age: 20, more: { phone: "11111111" } },
//       { user: "Luis", age: 21, more: { phone: "12345678" } },
//     ],
//   },
//   {
//     sheet: "Children",
//     columns: [
//       { label: "User", value: "user" }, // Top level data
//       { label: "Age", value: "age", format: '# "years"' }, // Column format
//       { label: "Phone", value: "more.phone", format: "(###) ###-####" }, // Deep props and column format
//     ],
//     content: [
//       { user: "Manuel", age: 16, more: { phone: 9999999900 } },
//       { user: "Ana", age: 17, more: { phone: 8765432135 } },
//     ],
//   },
// ]

// Will download the excel file


export function exportFileToExcel(contentData, fileName) {

    /*
    createdAt
: 
"2023-01-06T13:53:49.419Z"
createdBy
: 
"63b81a2f8651b8bc005994c0"
email
: 
"oyedokunoluwatobiloba9@gmail.com"
firstname
: 
"Alade"
isAccountVerified
: 
"approved"
lastname
: 
"Tobi"
password
: 
"$2a$10$SrBq3lv9PnE76xCrNJY8JONQn3JDJ05F2BxXQkf1tYtG3SPzoMI4m"
phone_number
: 
23409027014169
profileImage
: 
"https://res.cloudinary.com/edikeeduloan/image/upload/v1673013228/Edike%20Admins%20Profile%20Image/1673013228196.png"
publicID
: 
"Edike Admins Profile Image/1673013228196"
role
: 
"admin"
staff_number
: 
"EDI-001"
status
: 
"active"
updatedAt
: 
"2023-01-15T12:54:37.271Z"

[
                { user: "Andrea", age: 20, more: { phone: "11111111" } },
                { user: "Luis", age: 21, more: { phone: "12345678" } },
            ],
    */

    let contentColumn;

    if (fileName === 'Users') {
        contentColumn = [
            { label: "Admin Name", value: (row) => row.firstname + row.lastname },
            { label: "Admin Email", value: (row) => row.email },
            { label: "Staff Id", value: (row) => row.staff_number },
            { label: "Phone", value: (row) => row.phone_number },
            { label: "Date", value: (row) => row.createdAt },
            { label: "Status", value: (row) => row.status },
        ];
    } else if (fileName === 'Customers') {
        contentColumn = [
            { label: "Customer Name", value: (row) => row.firstname + row.lastname },
            { label: "Customer Email", value: (row) => row.email },
            { label: "Location", value: (row) => row.residence_address },
            { label: "Phone", value: (row) => row.phone },
            { label: "Date", value: (row) => row.createdAt },
            { label: "Status", value: (row) => row.status },
        ];
    } else if (fileName === 'Loans') {
        contentColumn = [
            { label: "Date", value: (row) => row.createdAt },
            { label: "Beneficiary", value: (row) => row.beneficiaryDetails ? `${row.beneficiaryDetails[0].firstname} ${row.beneficiaryDetails[0].lastname}` : '-' },
            { label: "Loan ID", value: (row) => row.loan_reference},
            { label: "Amount", value: (row) => row.beneficiary_amount },
            { label: "Loan Tenor", value: (row)=> `${row.beneficiary_duration} months`},
            { label: "Monthly Repayment", value: (row)=> row.nextPayment},
            { label: "Paid", value: (row)=> row.accessTime},
            { label: "Balance", value: (row)=> row.paymentBalance},
            { label: "Next Payment", value: (row)=> row.paymentDate},
            { label: "First Due Date", value: (row)=> row.firstdue},
            { label: "Second Due Date", value: (row)=> row.seconddue},
            { label: "Third Due Date", value: (row)=> row.thirddue},
            { label: "Status", value: (row) => row.status },
        ];
    } else if (fileName === 'Transactions') {
        contentColumn = [
            { label: "Date", value: (row) => row.date },
            { label: "Customer Name", value: (row) => row.cus_name},
            { label: "Customer Email", value: (row) => row.cus_email},
            { label: "Customer ID", value: (row) => row.cus_ref},
            { label: "Loan ID", value: (row) => row.loan_ref},
            { label: "Transaction ID", value: (row) => row.reference},
            { label: "Amount", value: (row) => row.amount},
            { label: "Channel", value: (row) => row.type},
            { label: "Status", value: (row) => row.verified},
        ];
    }

    let data = [
        {
            sheet: "User",
            columns: contentColumn,
            content: contentData
        }
    ];

    let settings = {
        fileName: fileName, // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
        RTL: false, // Display the columns from right-to-left (the default value is false)
    };

    xlsx(data, settings)
}