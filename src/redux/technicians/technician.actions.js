import { TechnicianActionTypes } from "./technician.types";

//create
export const addTechnicianStart = (technician) => ({
  type: TechnicianActionTypes.ADD_TECHNICIAN_START,
  payload: technician,
});

export const addTechnicianSuccess = (technician) => ({
  type: TechnicianActionTypes.ADD_TECHNICIAN_SUCCESS,
  payload: technician,
});

export const addTechnicianFailure = (errorMessage) => ({
  type: TechnicianActionTypes.ADD_TECHNICIAN_FAILURE,
  payload: errorMessage,
});

//read
// export const fetchTechniciansStart = () => ({
//   type: TechnicianActionTypes.FETCH_TECHNICIANS_START,
// });

export const fetchTechniciansSuccess = (techniciansMap) => ({
  type: TechnicianActionTypes.FETCH_TECHNICIANS_SUCCESS,
  payload: techniciansMap,
});

export const fetchTechniciansFailure = (errorMessage) => ({
  type: TechnicianActionTypes.FETCH_TECHNICIANS_FAILURE,
  payload: errorMessage,
});

//update
export const updateTechnicianStart = (technician) => ({
  type: TechnicianActionTypes.UPDATE_TECHNICIAN_START,
  payload: technician,
});

export const updateTechnicianSuccess = (technician) => ({
  type: TechnicianActionTypes.UPDATE_TECHNICIAN_SUCCESS,
  payload: technician,
});

export const updateTechnicianFailure = (errorMessage) => ({
  type: TechnicianActionTypes.UPDATE_TECHNICIAN_FAILURE,
  payload: errorMessage,
});

//delete
export const deleteTechnicianStart = (technician) => ({
  type: TechnicianActionTypes.DELETE_TECHNICIAN_START,
  payload: technician,
});

export const deleteTechnicianSuccess = (technician) => ({
  type: TechnicianActionTypes.DELETE_TECHNICIAN_SUCCESS,
  payload: technician,
});

export const deleteTechnicianFailure = (errorMessage) => ({
  type: TechnicianActionTypes.DELETE_TECHNICIAN_FAILURE,
  payload: errorMessage,
});
