import request from '../../../utils/fetch';

// add data
export const addCar = ({ manufacture, carName }) => 
    request.post(`/enquiryprocess/cars/createCar`, { manufacture, carName })

// fetch data
export const loadCar = ({query}) => 
    request.post(`/enquiryprocess/cars/loadCar`, {query})

// fetch manufature
export const fetchManufactures = () => 
    request.get(`/enquiryprocess/manufactures/loadManufactures`)

// delete data
export const deleteCar = ({ id }) =>
    request.post(`/enquiryprocess/cars/deleteCar`, { id })

// update data
export const updateCar = ({ datas }) =>
    request.post(`/enquiryprocess/cars/updateCar`, { datas })