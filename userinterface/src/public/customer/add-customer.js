import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CAlert,
  CInputFile
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from 'yup';
import { createCustomer } from '../../modules/customer/actions';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
class AddCustomer extends Component {
  constructor() {
    super();
    this.state = {
      error: {},
      data: '',
      success: false
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.customer.response) {
      this.props.history.push({
        pathname: '../customer/list-customer',
        appState: {
          customer_create_status : true,
        }
      });
    }

    if(nextProps.customerErrors.errors) {
      this.setState({
        error: nextProps.customerErrors.errors
      });
    }
  }
  
  // reset
  handleReset = (resetForm) => {
    if (window.confirm('Reset?')) {
      resetForm();
    }
  };

  onSubmit(formData) {

    var customer = {};

    this.setState({
      success: false,
      commonErrors: ''
    });

    customer.companyName = formData.companyName;
    customer.contactPersonFirstname = formData.contactPersonFirstname;
    customer.contactPersonLastname = formData.contactPersonLastname;
    customer.contactPersonMobile = formData.contactPersonMobile;
    customer.contactPersonEmail = formData.contactPersonEmail;
    customer.companyPhone = formData.companyPhone;
    customer.emirates = formData.emirates;
    customer.buildingNumber = formData.buildingNumber;
    customer.street = formData.street;
    customer.address = formData.address;

    this.props.createCustomer(customer);
    
  }
  render() {
    const { error, success } = this.state;
    return (
      <Formik
      initialValues = {{
        companyName: '',
        contactPersonFirstname: '',
        contactPersonLastname: '',
        contactPersonMobile: '',
        contactPersonEmail: '',
        companyPhone: '',
        emirates: '',
        buildingNumber: '',
        street: '',
        address: '',
        errors: '',
      }}
      onReset={this.handleReset}
      validationSchema={Yup.object().shape({
        companyName: Yup.string().required('Company name is required'),
        contactPersonMobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Mobile number is required'),
        contactPersonEmail: Yup.string().email('Invalid email').required('Email is required'),
        companyPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
        emirates: Yup.string().required('Emirate is required'),
      })}
      onSubmit={this.onSubmit}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
          handleBlur
        }) => {
        return (
          <CRow>
            <CCol xs="12" md="6" className="pfs-md-5 offset-3">
              <CCard>
                <CCardBody>
                  { success ? <CAlert color="success">Data saved successfully</CAlert> : null }
                  { error && error.Account ? <CAlert color="warning">{ error.Account }</CAlert> : null }
                  <CForm className="form-horizontal" onSubmit={handleSubmit}>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-email">Company Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="companyName" 
                            name="companyName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.companyName}
                          />
                          { touched.companyName && errors.companyName ? <div className="warning-text">{ errors.companyName }</div> : null}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Contact person First Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="contactPersonFirstname" 
                            name="contactPersonFirstname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.contactPersonFirstname}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Contact person Last Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="contactPersonLastname" 
                            name="contactPersonLastname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.contactPersonLastname}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Contact person Mobile</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="tel" 
                            id="contactPersonMobile" 
                            name="contactPersonMobile"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.contactPersonMobile}
                          />
                          { touched.contactPersonMobile && errors.contactPersonMobile ? <div className="warning-text">{errors.contactPersonMobile }</div> : null}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Contact person Email</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="email" 
                            id="contactPersonEmail" 
                            name="contactPersonEmail"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.contactPersonEmail}
                          />
                          { touched.contactPersonEmail && errors.contactPersonEmail ? <div className="warning-text">{errors.contactPersonEmail }</div> : null}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Company Phone</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="tel" 
                            id="companyPhone" 
                            name="companyPhone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.companyPhone}
                          />
                          { touched.companyPhone && errors.companyPhone ? <div className="warning-text">{ errors.companyPhone }</div> : null}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Emirates</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CSelect name="emirates" id="emirates" onChange={handleChange} value={values.emirates} onBlur={handleBlur}>
                            <option value="0">Please select</option>
                            <option value="1" defaultValue="1">Anas Dubai</option>
                            <option value="2">Option #2</option>
                            <option value="3">Option #3</option>
                          </CSelect>
                          { touched.emirates && errors.emirates ? <div className="warning-text">{ errors.emirates }</div> : null}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Building Number</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="buildingNumber" 
                            name="buildingNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.buildingNumber}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Street</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="street" 
                            name="street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.street}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Adress</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInput 
                            type="text" 
                            id="address" 
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                          />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Upload trade license</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInputFile id="file-input" name="file-input"/>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                          <CLabel htmlFor="hf-password">Upload profile image/  company logo</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                          <CInputFile id="file-input" name="file-input"/>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12" className="text-center">
                          <CButton type="submit" color="primary"><CIcon name="cil-save" /> Save</CButton>
                        </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        );
        }}
      </Formik>
    )
  }
}

AddCustomer.propTypes = {
  customerErrors: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  customerErrors: state.customerErrors,
  customer: state.customer
});
export default connect(
  mapStateToProps,
  { createCustomer }
)(AddCustomer);
