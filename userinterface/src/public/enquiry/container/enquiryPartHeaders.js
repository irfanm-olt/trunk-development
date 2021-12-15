import React from "react";
import CIcon from '@coreui/icons-react'
import { CButton } from "@coreui/react";
const EnquiryPartHeaders = (props) => {
    return(
        props.enquiryPartHeaders.map((item, index) => {
            let partName = `parts-${index}`, quantity = `quantity-${index}`;
            return(
                <tr key={item}>
                    <td>
                        <select className="custom-select"  data-id={index}  name="partName" id={partName}>
                            <option value="">Select Part Name</option>
                        {
                            props.part? props.part.map((item, index) => {
                            return <optgroup label={item.Name}>
                                {
                                item.parts ? item.parts.map((item, index) => {
                                    return <option value={item.ID}>{item.Name}</option>
                                }): null
                                }
                            </optgroup>
                            }): null
                        }
                        </select>
                    </td>
                    <td>
                        <select className="custom-select" data-id={index} id={quantity} name="quantity">
                            <option value="">Select Quantity</option>
                            {[...Array(10)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                            )}
                        </select>
                    </td>
                    <td>
                        {
                            index === 0?
                            <a  onClick={() => props.add()} name="add" height="25" alt="Logo"><CButton className="btn-primary">+ ADD</CButton></a>
                            :
                            // <CIcon onClick={() => props.delete(item)} name="trash" height="30" alt="Logo"/>
                            <button onClick={() => props.delete(item)} className="action-button">
                                <CIcon name="cil-trash" height="18" alt="Logo"/>
                            </button>
                        }
                    </td>
                </tr>
            )
        })
    )
}

export default EnquiryPartHeaders;