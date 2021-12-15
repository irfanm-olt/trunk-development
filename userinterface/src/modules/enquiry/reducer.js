import * as Actions from './constants';
const initState = {
  loading: false,
  success: false,
  partHeaders: [],
  partNumberData: [],
  partPriceSuccess: false,
  priceData: [],
  loadVehicleSuccess: false,
  addEnquirySuccess: false,
  addHeaderSuccess: false,
  addPartNumberSuccess: false,
  enquiryList: [],
  vehicleLoading: false,
  loadPartDetails: false,
  successPartDetails: false,
  partDetails: [],
  pager: {},
}


export default function enquiryReducer(state = initState, action) {
    switch (action.type) {
        case Actions.LOAD_VEHICLE:
          return {
              ...state,
              loadVehicle: true,
              loadVehicleSuccess: false,
              vehicleLoading: true,
          };
        case Actions.LOAD_VEHICLE_SUCCESS:
          return {
              ...state,
              loading: false,
              vehicleData: action.payload,
              loadVehicle: false,
              vehicleLoading: false,
              loadVehicleSuccess: true,
          }
        case Actions.LOAD_VEHICLE_ERROR:
          return {
              ...state,
              loadVehicle: false,
              error: action.error,
              vehicleLoading: false,
              loadVehicleSuccess: false,
          }
        case Actions.LOAD_MASTER:
            return {
                ...state,
                loading: true,
            };
        case Actions.LOAD_MASTER_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: action.customer,
                manufacture: action.manufacture,
                car: action.car
            }
        case Actions.LOAD_MASTER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            }
        case Actions.ADD_ENQUIRY_CAR:
            return {
                ...state,
                loading: true,
                data: '',
                addEnquirySuccess: false
            };
        case Actions.ADD_ENQUIRY_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                addEnquirySuccess: true,
            }
        case Actions.ADD_ENQUIRY_CAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                addEnquirySuccess: false,
                data:''
            }
        case Actions.LOAD_PARTS:
            return {
                ...state,
                loading: true,
            };
        case Actions.LOAD_PARTS_SUCCESS:
            return {
                ...state,
                loading: false,
                parts: action.payload
            }
        case Actions.LOAD_PARTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            }
        case Actions.ADD_ENQUIRY_PART_HEADER:
            return {
                ...state,
                loading: true,
                data: '',
                addHeaderSuccess: false
            };
        case Actions.ADD_ENQUIRY_PART_HEADER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                addHeaderSuccess: true,
            }
        case Actions.ADD_ENQUIRY_PART_HEADER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: '',
                addHeaderSuccess: false
            }
        case Actions.LOAD_ENQUIRY_PART_HEADER:
            return {
                ...state,
                loading: true,
            }
        case Actions.LOAD_ENQUIRY_PART_HEADER_SUCCESS:
            return {
                ...state,
                loading: false,
                partNumberData: action.partHeaders,
                manufactureData: action.manufacture,
                manufactureID: action.manufactureId
            }
        case Actions.LOAD_ENQUIRY_PART_HEADER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            }
        case Actions.ADD_PART_NUMBER:
            return {
                ...state,
                addPartNumberSuccess: false
            };
        case Actions.ADD_PART_NUMBER_SUCCESS:
            return {
                ...state,
                partNumberData: state.partNumberData.concat(action.payload),
                addPartNumberSuccess: true,
            }
        case Actions.ADD_PART_NUMBER_ERROR:
            return {
                ...state,
                error: action.error,
                addPartNumberSuccess: false
            }
        /**
         * add part price
         */
         case Actions.ADD_PART_PRICE:
            return {
                ...state,
                partPrice: '',
                partPriceLoading: true,
                partPriceSuccess: false,
            };
        case Actions.ADD_PART_PRICE_SUCCESS:
            return {
                ...state,
                priceData: state.priceData.concat(action.payload),
                partPriceLoading: false,
                partPriceSuccess: true,
            }
        case Actions.ADD_PART_PRICE_ERROR:
            return {
                ...state,
                partPrice: '',
                error: action.error,
                partPriceLoading: false,
                partPriceSuccess: false,
            }
        /**
         * load part details
         */
        case Actions.LOAD_PART_DETAILS:
            return {
                ...state,
                partPrice: '',
            };
        case Actions.LOAD_PART_DETAILS_SUCCESS:
            return {
                ...state,
                priceData: action.payload,
            }
        case Actions.LOAD_PART_DETAILS_ERROR:
            return {
                ...state,
                partPrice: '',
                error: action.error,
            }
        /**
         * LOAD ENQUIRY CAR DETAILS
         */
         case Actions.LOAD_ENQUIRY_CAR_DETAILS:
            return {
                ...state,
                data: '',
            };
        case Actions.LOAD_ENQUIRY_CAR_DETAILS_SUCCESS:
            return {
                ...state,
                enquiryList: action.payload,
                pager: action.pager
            }
        case Actions.LOAD_ENQUIRY_CAR_DETAILS_ERROR:
            return {
                ...state,
                data: '',
                error: action.error,
            }
        /**
         * LOAD ENQUIRY PART DETAILS
         */
        case Actions.LOAD_ENQUIRY_PART_DETAILS:
            return {
                ...state,
                loadPartDetails: true,
            };
        case Actions.LOAD_ENQUIRY_PART_DETAILS_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                loadPartDetails: false,
                successPartDetails: true,
                partDetails: action.payload
            }
        case Actions.LOAD_ENQUIRY_PART_DETAILS_ERROR:
            return {
                ...state,
                loadPartDetails: false,
                successPartDetails: false,
                error: action.error,
            }
      default:
        return state;
    }
}