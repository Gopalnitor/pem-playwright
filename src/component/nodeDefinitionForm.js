import React from "react"
import { Navigate } from "react-router-dom"
import useForm from "../utils/useForm"
import {
  Button,
  Checkbox,
  Form,
  RadioButton,
  RadioButtonGroup,
  Select,
  SelectItem,
  TextInput,
  TextArea,
  Grid,
  Column,
} from "@carbon/react"
import { QX } from "@carbon/icons-react"
import validateRegister from "../utils/nodeDefinitionValidationRules"

import "../styles/form.css"

const NodeDefinitionForm = ({ onClose }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validateRegister
  )

  function login() {
    return <Navigate to="/" />
  }

  return (
    <div className="node-data-container">
      <Form
        id="registration-form"
        aria-label="register form"
        className="node-data-form"
      >
        <Grid>
          {/* Close Button */}
          <Column lg={16}>
            <span
              id="crossDefinitionBtn"
              onClick={onClose}
              className="cross-icon-container"
            >
              <QX size={24} />
            </span>
          </Column>
          {/* Definition Form text */}
          <Column lg={16}>
            <span id="definitionTxt" className="login-text form-input">
              Definition Form
            </span>
          </Column>
          {/* Name */}
          <Column lg={16}>
            <TextInput
              id="name"
              className="form-input"
              labelText="Name"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={values.name || ""}
              invalid={errors.name}
              invalidText={errors.name}
            />
          </Column>
          {/* URL */}
          <Column lg={16}>
            <TextInput
              id="url"
              className="form-input"
              labelText="URL"
              placeholder="https://xyz.com"
              name="url"
              onChange={handleChange}
              value={values.url || ""}
              invalid={errors.url}
              invalidText={errors.url}
            />
          </Column>
          {/* Description */}
          <Column lg={16}>
            {" "}
            <TextArea
              id="description"
              className="form-input"
              labelText="Description"
              placeholder="Lorem Lipsum"
              name="description"
              onChange={handleChange}
              value={values.description || ""}
              invalid={errors.description}
              invalidText={errors.description}
              rows={4}
            />
          </Column>
          {/* Role */}
          <Column lg={16}>
            <Select
              className="form-input"
              id="role"
              name="role"
              defaultValue="chooseAnOption"
              labelText="Role"
              onChange={handleChange}
              value={values.role || "chooseAnOption"}
              invalid={errors.role}
              invalidText={errors.role}
            >
              <SelectItem
                disabled
                hidden
                value="chooseAnOption"
                text="Choose an option"
              />
              <SelectItem value="admin" text="Admin" />
              <SelectItem value="user" text="User" />
              <SelectItem value="volunteer" text="Volunteer" />
            </Select>
          </Column>
          {/* Email */}
          <Column lg={16}>
            <TextInput
              id="email"
              className="form-input"
              labelText="Email"
              placeholder="some@gmail.com"
              name="email"
              onChange={handleChange}
              value={values.email || ""}
              invalid={errors.email}
              invalidText={errors.email}
            />
          </Column>
          {/* Password */}
          <Column lg={16}>
            <TextInput
              id="password"
              type="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              className="form-input"
              labelText="Password"
              invalid={errors.password}
              invalidText={errors.password}
              name="password"
              onChange={handleChange}
              value={values.password || ""}
            />
          </Column>
          {/* Format */}
          <Column lg={16} style={{ margin: "0.5rem 1rem" }}>
            <RadioButtonGroup
              name="format"
              defaultSelected="svg"
              legendText="Format"
              onClick={handleChange}
              value={values.format || "svg"}
            >
              <RadioButton
                value="svg"
                id="svg"
                labelText="SVG"
                className="form-input"
              />
              <RadioButton
                value="pdf"
                labelText="PDF"
                id="pdf"
                className="form-input"
              />
              <RadioButton
                value="jpg"
                labelText="JPG"
                id="jpg"
                className="form-input"
              />
            </RadioButtonGroup>
          </Column>
          {/* Terms */}
          <Column lg={16} style={{ margin: "0.5rem 1rem" }}>
            <Checkbox
              name="termsAndCondition"
              labelText="I do accept the Terms and Conditions of your site."
              className="form-input"
              id="termsAndCondition"
              onClick={handleChange}
              value={values.termsAndCondition || ""}
            />
          </Column>
          {/* Submit Button */}
          <Column lg={4}>
            <Button
              id="submitBtn"
              type="submit"
              className="form-input"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Column>
        </Grid>
      </Form>
    </div>
  )
}

export default NodeDefinitionForm
