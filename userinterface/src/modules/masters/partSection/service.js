import request from '../../../utils/fetch';

// add data
export const addPartSection = ({ sectionName }) => 
    request.post(`/enquiryprocess/partSections/createPartSection`, { sectionName })

// fetch data
export const loadPartSection = ({query}) => 
    request.post(`/enquiryprocess/partSections/loadPartSection`, {query})

// delete data
export const deletePartSection = ({ id }) =>
    request.post(`/enquiryprocess/partSections/deletePartSection`, { id })

// update data
export const updatePartSection = ({ datas }) =>
    request.post(`/enquiryprocess/partSections/updatePartSection`, { datas })