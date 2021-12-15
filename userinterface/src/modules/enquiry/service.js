import request from '../../utils/fetch';

export const loadVehicle = (chassisNumber) =>
  request.get(`https://car-insurance.salama.ae/motor/search/vehicle/chassisnumbers/ajax/?chassisnumber=`, chassisNumber);

  // fetch manufature
export const fetchManufactures = () => 
request.get(`/enquiryprocess/manufactures/loadManufactures`)

// fetch car
export const fetchCars = () => 
request.get(`/enquiryprocess/cars/loadCars`)

// fetch customers
export const fetchCustomers = () => 
    request.get(`/enquiryprocess/customers/loadCustomer`)

// fetch parts
export const fetchParts = () =>
    request.get(`/enquiryprocess/parts/fetchPartsAll`);

// add enquiry car
export const addEnquiryCar = ({ manufacture, carName, customer, chassisNumber, modelYear, variant }) =>
    request.post(`/enquiryprocess/enquiryCarDetails/createEnquiryCarDetails`, { manufacture, carName, customer, chassisNumber, modelYear, variant });

// add part number
export const addPartNumber = ({ datas }) =>
    request.post(`/enquiryprocess/enquiryPartHeaders/addPartNumber`, { datas });

// load enquiry parts
export const loadEnquiryPartHeader = ({ enquiryID }) => 
    request.post(`/enquiryprocess/enquiryPartHeaders/loadEnquiryPartHeader`, { enquiryID });

// get manufacture id by enquiry id
export const getManufactureByID = ({ enquiryID }) => 
    request.post(`/enquiryprocess/enquiryCarDetails/getManufactureByID`, { enquiryID })

// add enquiry part header
export const addEnquiryPartHeader = ({ datas }) =>
    request.post(`/enquiryprocess/enquiryPartHeaders/createEnquiryPartHeader`, { datas });

// add price 
export const addpartPrice = ({ datas }) =>
    request.post(`/enquiryprocess/enquiryPartDetails/createEnquiryPartDeatils`, { datas });

// load part details
export const loadEnquiryPartDetails = ({ partheaderID }) => 
    request.post(`/enquiryprocess/enquiryPartDetails/loadEnquiryPartDeatils`, { partheaderID });

// load enquiry car details
export const loadEnquiryCarDetails = ({ query }) => 
    request.post(`/enquiryprocess/enquiryCarDetails/loadEnquiryCarDetail`, { query });

// load enquiry part details
export const loadPartDetail = ({ enquiryID }) =>
    request.post(`/enquiryprocess/enquiryPartDetails/loadPartDeatil`, { enquiryID });

