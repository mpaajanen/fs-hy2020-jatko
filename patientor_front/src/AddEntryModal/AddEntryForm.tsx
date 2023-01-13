import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, HealthCheckRatingOption } from "./FormField";
import { HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";

export type EntryFormValues = Omit<HospitalEntry, "id" > | Omit<OccupationalHealthcareEntry, "id"> | Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "High Risk" },
  { value: 3, label: "Critical Risk" },
];

const formValues: EntryFormValues = {
  description: "",
  date: "",
  specialist: "",
  type: "HealthCheck",
  healthCheckRating: 0,
};

function validateDate(value: string) {
  let error;
  if (!value) {
    error = 'Field is required.';
  } else if (!/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/i.test(value)) {
    error = 'Date must be in YYYY-MM-DD format.';
  }
  return error;
}

function validateRequired(value: string) {
  return !value ? 'Field is required' : null;
}

const extraFieldsByEntryType = (type: string) => {
  switch (type) {
    case "HealthCheck":
      return (
        <SelectField label="Healthcheck Rating" name="healthCheckRating" options={healthCheckRatingOptions} />
      );
    case "OccupationalHealthcare":
      return (
        <>
        <Field
          label="Employer name"
          placeholder="Employer name"
          name="employerName"
          component={TextField}
          validate={validateRequired}
        />
        <Field
          label="Sickleave start date"
          placeholder="YYYY-MM-DD"
          name="sickLeave.startDate"
          component={TextField}
          validate={validateDate}
        />
        <Field
          label="Sickleave end date"
          placeholder="YYYY-MM-DD"
          name="sickLeave.endDate"
          component={TextField}
          validate={validateDate}
        />
      </>
      );
    case "Hospital":
      return (
        <>
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
            validate={validateDate}
            />
          <Field
            label="Discharge criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
            validate={validateRequired}
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
        // if (values.type === "Hospital" && !values.discharge) {
        //   errors.discharge = requiredError;
        // }
        return errors;
      }}
    >
      {({ isValid, dirty, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
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
      }}
    </Formik>
  );
};

export default AddEntryForm;