import * as Actions from "./constants";

export function createCustomer({ 
     companyName, 
     contactPersonFirstname, 
     contactPersonLastname, 
     contactPersonMobile, 
     contactPersonEmail, 
     companyPhone, 
     emirates, 
     buildingNumber, 
     street, 
     address }) {
    return {
        type: Actions.CREATE_CUSTOMER,
        companyName,
        contactPersonFirstname,
        contactPersonLastname,
        contactPersonMobile,
        contactPersonEmail,
        companyPhone,
        emirates,
        buildingNumber,
        street,
        address
    }
}


 export function loadCustomer({ query }) {
    return {
        type: Actions.LOAD_CUSTOMER,
        query
    }
}

export function deleteCustomer({id}) {
    return {
        type: Actions.DELETE_CUSTOMER,
        id
    }
}