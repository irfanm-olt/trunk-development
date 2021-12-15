import request from '../../utils/fetch';

export const createCustomer = ({ companyName, contactPersonFirstname, contactPersonLastname, contactPersonMobile, contactPersonEmail, companyPhone, emirates, buildingNumber, street, address }) => 
    request.post(`/enquiryprocess/customers/createCustomer`, { companyName, contactPersonFirstname, contactPersonLastname, contactPersonMobile, contactPersonEmail, companyPhone, emirates, buildingNumber, street, address })


// fetch data
export const loadCustomer = ({ query }) => 
    request.post(`/enquiryprocess/customers/loadCustomers`, { query });

// delete data
export const deleteCustomer = ({ id }) =>
    request.post(`/enquiryprocess/customers/deleteCustomer`, { id })
