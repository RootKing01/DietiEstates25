/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { User } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function UserCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Name: "",
    Surname: "",
    Email: "",
    Password: "",
    TelephoneNumber: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Surname, setSurname] = React.useState(initialValues.Surname);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Password, setPassword] = React.useState(initialValues.Password);
  const [TelephoneNumber, setTelephoneNumber] = React.useState(
    initialValues.TelephoneNumber
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.Name);
    setSurname(initialValues.Surname);
    setEmail(initialValues.Email);
    setPassword(initialValues.Password);
    setTelephoneNumber(initialValues.TelephoneNumber);
    setErrors({});
  };
  const validations = {
    Name: [],
    Surname: [],
    Email: [],
    Password: [],
    TelephoneNumber: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Name,
          Surname,
          Email,
          Password,
          TelephoneNumber,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new User(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name: value,
              Surname,
              Email,
              Password,
              TelephoneNumber,
            };
            const result = onChange(modelFields);
            value = result?.Name ?? value;
          }
          if (errors.Name?.hasError) {
            runValidationTasks("Name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("Name", Name)}
        errorMessage={errors.Name?.errorMessage}
        hasError={errors.Name?.hasError}
        {...getOverrideProps(overrides, "Name")}
      ></TextField>
      <TextField
        label="Surname"
        isRequired={false}
        isReadOnly={false}
        value={Surname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Surname: value,
              Email,
              Password,
              TelephoneNumber,
            };
            const result = onChange(modelFields);
            value = result?.Surname ?? value;
          }
          if (errors.Surname?.hasError) {
            runValidationTasks("Surname", value);
          }
          setSurname(value);
        }}
        onBlur={() => runValidationTasks("Surname", Surname)}
        errorMessage={errors.Surname?.errorMessage}
        hasError={errors.Surname?.hasError}
        {...getOverrideProps(overrides, "Surname")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Surname,
              Email: value,
              Password,
              TelephoneNumber,
            };
            const result = onChange(modelFields);
            value = result?.Email ?? value;
          }
          if (errors.Email?.hasError) {
            runValidationTasks("Email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("Email", Email)}
        errorMessage={errors.Email?.errorMessage}
        hasError={errors.Email?.hasError}
        {...getOverrideProps(overrides, "Email")}
      ></TextField>
      <TextField
        label="Password"
        isRequired={false}
        isReadOnly={false}
        value={Password}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Surname,
              Email,
              Password: value,
              TelephoneNumber,
            };
            const result = onChange(modelFields);
            value = result?.Password ?? value;
          }
          if (errors.Password?.hasError) {
            runValidationTasks("Password", value);
          }
          setPassword(value);
        }}
        onBlur={() => runValidationTasks("Password", Password)}
        errorMessage={errors.Password?.errorMessage}
        hasError={errors.Password?.hasError}
        {...getOverrideProps(overrides, "Password")}
      ></TextField>
      <TextField
        label="Telephone number"
        isRequired={false}
        isReadOnly={false}
        value={TelephoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Surname,
              Email,
              Password,
              TelephoneNumber: value,
            };
            const result = onChange(modelFields);
            value = result?.TelephoneNumber ?? value;
          }
          if (errors.TelephoneNumber?.hasError) {
            runValidationTasks("TelephoneNumber", value);
          }
          setTelephoneNumber(value);
        }}
        onBlur={() => runValidationTasks("TelephoneNumber", TelephoneNumber)}
        errorMessage={errors.TelephoneNumber?.errorMessage}
        hasError={errors.TelephoneNumber?.hasError}
        {...getOverrideProps(overrides, "TelephoneNumber")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
