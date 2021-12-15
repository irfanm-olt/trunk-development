import * as Actions from "./constants";

export function loadVehicle(chassisNumber) {
    return {
        type: Actions.LOAD_VEHICLE,
        chassisNumber,
    }
}

export function loadMasters() {
    return {
        type: Actions.LOAD_MASTER
    }
}

export function loadParts() {
    return {
        type: Actions.LOAD_PARTS
    }
}

export function addEnquiryCar({ manufacture, carName, customer, chassisNumber, modelYear, variant }) {
    return {
        type: Actions.ADD_ENQUIRY_CAR,
        manufacture,
        carName,
        customer,
        chassisNumber,
        modelYear,
        variant
    }
}

export function addEnquiryPartHeader({ datas }) {
    return {
        type: Actions.ADD_ENQUIRY_PART_HEADER,
        datas
    }
}

export function addPartNumber({ datas }) {
    return {
        type: Actions.ADD_PART_NUMBER,
        datas
    }
}

export function loadEnquiryPartHeader({ enquiryID }) {
    return {
        type: Actions.LOAD_ENQUIRY_PART_HEADER,
        enquiryID
    }
}

// ADD PART PRICE
export function addPartPrice({ datas }) {
    return {
        type: Actions.ADD_PART_PRICE,
        datas
    }
}

//  LOAD PART PRICE
export function loadPartDetails({ partheaderID }) {
    return {
        type: Actions.LOAD_PART_DETAILS,
        partheaderID
    }
}

// LOAD ENQUIRY CAR DETAILS /* LIST ENQUIRY
export function loadEnquiryCarDetails({ query }) {
    return {
        type: Actions.LOAD_ENQUIRY_CAR_DETAILS,
        query
    }
}

//  LOAD ENQUIRY PART DETAILS
export function loadEnquiryPartDetails({ enquiryID }) {
    return {
        type: Actions.LOAD_ENQUIRY_PART_DETAILS,
        enquiryID
    }
}



