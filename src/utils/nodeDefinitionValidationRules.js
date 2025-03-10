export default function validateRegister(values) {
  let errors = {}
  if (!values.name) {
    errors.name = "Name is required"
  }
  if (!values.url) {
    errors.url = "URL is required"
  }
  if (!values.description) {
    errors.description = "Description is required"
  }

  if (!values.role) {
    errors.role = "Role is required"
  }

  if (!values.email) {
    errors.email = "Email description is required"
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email description is invalid"
  }
  if (!values.password) {
    errors.password = "Password is required"
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 or more characters"
  } else if (!/\d/.test(values.password)) {
    errors.password = "Password must contain atleast 1 number"
  } else if (!/[!@#$%&?]/g.test(values.password)) {
    errors.password = "Password must contain atleast 1 special character"
  } else if (!/[A-Z]/g.test(values.password)) {
    errors.password = "Password must contain atleast 1 capitol letter"
  }

  return errors
}
