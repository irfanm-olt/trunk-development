import request from '../../../utils/fetch';

// add data
export const addManufacture = ({ manufacture }) => 
    request.post(`/enquiryprocess/manufactures/createManufacture`, { manufacture })

// fetch data
export const loadManufacture = ({ query }) => 
    request.post(`/enquiryprocess/manufactures/loadManufacture`, {query})

// delete data
export const deleteManufacture = ({ id }) =>
    request.post(`/enquiryprocess/manufactures/deleteManufacture`, { id })

// update data
export const updateManufacture = ({ datas }) =>
    request.post(`/enquiryprocess/manufactures/updateManufacture`, { datas })