import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption } from "./FormField";
import { HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckRating } from "../types";
// import { HospitalEntry } from "../types";

export type EntryFormValues = Omit<HospitalEntry, "id" > | Omit<OccupationalHealthcareEntry, "id"> | Omit<HealthCheckEntry, "id">;
export type EntryFormValues2 = Omit<HealthCheckEntry, "id" >;

export interface AllFormValues {
  description: string,
  date: string,
  specialist: string,
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital",
  discharge?: {
    date: string,
    criteria: string
  }
  healthCheckRating?: HealthCheckRating,
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

const healthCheckRatingOptions: TypeOption[] = [
  { value: "Healthy", label: "Healthy" },
  { value: "LowRisk", label: "Low Risk" },
  { value: "HighRisk", label: "High Risk" },
  { value: "CriticalRisk", label: "Critical Risk" },
];

// const baseValues =  {
//   description: "",
//   date: "",
//   specialist: "",
// };

const formValues: EntryFormValues = {
  description: "",
  date: "",
  specialist: "",
  // type: "Hospital",
  type: "HealthCheck",
  // discharge: {
  //   date: "",
  //   criteria: ""
  // },
  healthCheckRating: 0,
};

const extraFieldsByEntryType = (type: string) => {
  switch (type) {
    case "HealthCheck":
      return (
        <SelectField label="Healthcheck Rating" name="healthCheckRating" options={healthCheckRatingOptions} />
  
      // <Field
      //   label="Healthcheck Rating"
      //   placeholder="0, 1, 2 or 3"
      //   name="healthCheckRating"
      //   component={TextField}
      // />
      );
    case "Hospital":
      return (
        <>
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );  
    default:
      break;
  }

};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={formValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateFormatError = "Date must be in YYYY-MM-DD format.";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.date)) {
          errors.date = dateFormatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        // if (!values.discharge) {
        //   errors.discharge = requiredError;
        // }
        return errors;
      }}
    >
      {({ isValid, dirty, values }) => {
        console.log({values});
        // if (values.type === "Hospital") {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {extraFieldsByEntryType(values.type)}
            {/* <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Field
              label="Healthcheck Rating"
              placeholder="0, 1, 2 or 3"
              name="healthCheckRating"
              component={TextField}
            /> */}
            <SelectField label="Type" name="type" options={typeOptions} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      // }
      // else {
      //   return (
      //     <Form className="form ui">
      //       <SelectField label="Type" name="type" options={typeOptions} />
      //       <Grid>
      //         <Grid item>
      //           <Button
      //             color="secondary"
      //             variant="contained"
      //             style={{ float: "left" }}
      //             type="button"
      //             onClick={onCancel}
      //           >
      //             Cancel
      //           </Button>
      //         </Grid>
      //         <Grid item>
      //           <Button
      //             style={{
      //               float: "right",
      //             }}
      //             type="submit"
      //             variant="contained"
      //             disabled={!dirty || !isValid}
      //           >
      //             Add
      //           </Button>
      //         </Grid>
      //       </Grid>
      //     </Form>
      //   );
      // }
      }}
    </Formik>
  );
};

export default AddEntryForm;
