import * as Actions from './constants';
import {put, call, all, takeEvery} from 'redux-saga/effects';
import { 
    loadVehicle, 
    fetchManufactures, 
    fetchCars, 
    fetchCustomers, 
    addEnquiryCar, 
    fetchParts,
    addEnquiryPartHeader,
    loadEnquiryPartHeader,
    addPartNumber,
    addpartPrice,
    loadEnquiryPartDetails,
    getManufactureByID,
    loadEnquiryCarDetails,
    loadPartDetail,
} from './service';

/**
*   LOAD VEHICLE DETAILS WITH CHASSIS NUMBER
*/
function* loadVehicleSaga({ chassisNumber }) {
  try {
      const { data } = yield call(loadVehicle, {
        chassisNumber
      });
      //
      yield put({
        type: Actions.LOAD_VEHICLE_SUCCESS,
        payload: data,
    });
  } catch (error) {
      yield put({
          type: Actions.LOAD_VEHICLE_ERROR,
          error: error,
      });
  }
}

/**
*  LOAD MASTERS
*/
function* loadMasterSaga() {
  try {
        const { car, manufacture, customer } = yield all({
            car: call(fetchCars),
            manufacture: call(fetchManufactures),
            customer: call(fetchCustomers)
        });
        yield put({
            type: Actions.LOAD_MASTER_SUCCESS,
            car: car,
            manufacture: manufacture,
            customer: customer
        });
  } catch (error) {
        yield put({
            type: Actions.LOAD_MASTER_ERROR,
            error: error,
        });
  }
}


/**
 * LOAD PARTS
 */
function* loadPartsSaga() {
try {
    const { data } = yield call(fetchParts);
    yield put({
        type: Actions.LOAD_PARTS_SUCCESS,
        payload: data
    });
} catch (error) {
    yield put({
        type: Actions.LOAD_PARTS_ERROR,
        error: error,
    });
}
}

/**
 * ADD ENQUIRY CAR
 */
function* addEnquiryCarSaga({ manufacture, carName, customer, chassisNumber, modelYear, variant }) {
    try {
        const { data } = yield call(addEnquiryCar, {
            manufacture,
            carName,
            customer,
            chassisNumber,
            modelYear,
            variant
        });
        yield put({
            type: Actions.ADD_ENQUIRY_CAR_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: Actions.ADD_ENQUIRY_CAR_ERROR,
            payload: error,
        });
    }
}


/**
 *  ADD ENQUIRY PART HEADERS
 */
function* addEnquiryPartHeaderSaga(datas) {
    try {
        const { data } = yield call(addEnquiryPartHeader, datas);
        // car created
        //yield call(addEnquiryPartHeaderSuccess, data);
        yield put({
            type: Actions.ADD_ENQUIRY_PART_HEADER_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: Actions.ADD_ENQUIRY_PART_HEADER_ERROR,
            payload: error,
        });
    }
}


/**
 *  LOAD ENQUIRY PART HEADERS
 */
function* loadEnquiryPartHeaderSaga(enquiryID) {
    try {
        const { partHeaders, manufacture, manufactureid } = yield all({
            partHeaders: call(loadEnquiryPartHeader, enquiryID),
            manufacture: call(fetchManufactures),
            manufactureid: call(getManufactureByID, enquiryID),
        });
        yield put({
            type: Actions.LOAD_ENQUIRY_PART_HEADER_SUCCESS,
            partHeaders: partHeaders.data,
            manufacture: manufacture,
            manufactureId: manufactureid
        });

    } catch (error) {
        yield put({
            type: Actions.LOAD_ENQUIRY_PART_HEADER_ERROR,
            payload: error,
        });
    }
}


/**
 *  ADD ENQUIRY PART
 */
function* addPartNumberSaga(datas) {
    try {
        const { data } = yield call(addPartNumber, datas);
        yield put({
            type: Actions.ADD_PART_NUMBER_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: Actions.ADD_PART_NUMBER_ERROR,
            payload: error,
        });
    }
}


/**
 *  ADD ENQUIRY PART DETAILS
 */
 function* addPartPriceSaga(datas) {
    try {
        const { data } = yield call(addpartPrice, datas);
        yield put({
            type: Actions.ADD_PART_PRICE_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: Actions.ADD_PART_PRICE_ERROR,
            payload: error,
        });
    }
}

/**
 *  LOAD ENQUIRY PART DETAILS
 */
 function* loadEnquiryPartDetailsSaga(partheaderID) {
    try {
        const { data } = yield call(loadEnquiryPartDetails, partheaderID);
        yield put({
            type: Actions.LOAD_PART_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: Actions.LOAD_PART_DETAILS_ERROR,
            payload: error,
        });
    }
}

/**
 *  LOAD ENQUIRY CAR DETAILS /* LIST ENQUIRY 
 */
function* loadEnquiryCarDetailsSaga({ query }) {
    try {
        const { data, pager } = yield call(loadEnquiryCarDetails, { query });
        yield put({
            type: Actions.LOAD_ENQUIRY_CAR_DETAILS_SUCCESS,
            payload: data,
            pager: pager,
        });

    } catch (error) {
        yield put({
            type: Actions.LOAD_ENQUIRY_CAR_DETAILS_ERROR,
            payload: error,
        });
    }
}

/**
 *  LOAD ENQUIRY PART DETAILS
 */
function* loadPartDetailSaga(enquiryID) {
    try {
        const { data } = yield call(loadPartDetail, enquiryID);
        yield put({
            type: Actions.LOAD_ENQUIRY_PART_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        yield put({
            type: Actions.LOAD_ENQUIRY_PART_DETAILS_ERROR,
            payload: error,
        });
    }
}

export default function* enquirySaga() {
    yield takeEvery(Actions.LOAD_VEHICLE, loadVehicleSaga);
    yield takeEvery(Actions.LOAD_MASTER, loadMasterSaga);
    yield takeEvery(Actions.ADD_ENQUIRY_CAR, addEnquiryCarSaga);
    yield takeEvery(Actions.LOAD_PARTS, loadPartsSaga);
    yield takeEvery(Actions.ADD_ENQUIRY_PART_HEADER, addEnquiryPartHeaderSaga);
    yield takeEvery(Actions.LOAD_ENQUIRY_PART_HEADER, loadEnquiryPartHeaderSaga);
    yield takeEvery(Actions.ADD_PART_NUMBER, addPartNumberSaga);
    yield takeEvery(Actions.ADD_PART_PRICE, addPartPriceSaga);
    yield takeEvery(Actions.LOAD_PART_DETAILS, loadEnquiryPartDetailsSaga);
    yield takeEvery(Actions.LOAD_ENQUIRY_CAR_DETAILS, loadEnquiryCarDetailsSaga);
    yield takeEvery(Actions.LOAD_ENQUIRY_PART_DETAILS, loadPartDetailSaga);
}