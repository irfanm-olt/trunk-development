import request from '../../../utils/fetch';

// add part
export const addPart = ({ partSection, partName }) => 
    request.post(`/enquiryprocess/parts/createPart`, { partSection, partName })

// fetch part
export const loadPart = ({ query }) => 
    request.post(`/enquiryprocess/parts/fetchPart`, {  query })

// fetch part section
export const fetchPartSection = () => 
    request.get(`/enquiryprocess/partSections/loadParts`)

// delete data
export const deletePart = ({ id }) =>
    request.post(`/enquiryprocess/parts/deleteParts`, { id })

// update data
export const updatePart = ({ datas }) =>
    request.post(`/enquiryprocess/parts/updateParts`, { datas })