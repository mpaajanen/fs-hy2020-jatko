import { State } from "./state";
import { Patient, Diagnosis, FormEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: FormEntry;
    }
  | {
      type: "SET_SELECTED_PATIENT";
      payload: Patient;
  };

export const setPatientList = (content: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: content
  };
};

export const setDiagnosisList = (content: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: content
  };
};

export const addPatient = (content: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
  };
};

export const addEntry = (content: FormEntry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: content
  };
};

export const setSelectedPatient = (content: Patient): Action => {
  return {
    type: "SET_SELECTED_PATIENT",
    payload: content
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.payload.id];
      const modifiedPatient = {
        ...patient,
        entries: [...patient.entries, action.payload.entry]
      };
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: modifiedPatient
        }
      };
    case "SET_SELECTED_PATIENT":
      return {
        ...state,
        selectedPatient: action.payload
      };
    default:
      return state;
  }
};
