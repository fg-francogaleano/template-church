const blankSpace = /\s/; // Espacio en blanco
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3}$/i; // Email válido
const regexLetters = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/; // Solo letras

export default function validations(values) {
  const errors = {};

  /* NAME */
  if (!values.name) {
    errors.name = "Ingrese un nombre";
  }
  if (values.name && values.name.length > 30) {
    errors.name = "No debe tener más de 30 carácteres";
  }
  if (values.name && values.name && !regexLetters.test(values.name)) {
    errors.name = "No debe contener números ni símbolos";
  }
  if (values.name && values.name.length < 3) {
    errors.name = "No debe tener menos de 3 carácteres";
  }

  /* LAST NAME */
  if (!values.lastName) {
    errors.lastName = "Ingrese un apellido";
  }
  if (values.lastName && values.name.length > 30) {
    errors.lastName = "No debe tener más de 30 carácteres";
  }
  if (
    values.lastName &&
    values.lastName &&
    !regexLetters.test(values.lastName)
  ) {
    errors.lastName = "No debe contener números ni símbolos";
  }
  if (values.lastName && values.lastName.length < 3) {
    errors.lastName = "No debe tener menos de 3 carácteres";
  }

  /* EMAIL */
  if (!values.email) {
    errors.email = "Ingrese un correo electrónico";
  }
  if (values.email && blankSpace.test(values.email)) {
    errors.email = "No debe contener un espacio en blanco";
  }
  if (values.email && !regexEmail.test(values.email)) {
    errors.email = "Debe ser un email válido";
  }

  /* SUBJECT */
  if (!values.subject) {
    errors.subject = "Ingrese un asunto";
  }
  if (values.subject && values.name.length > 30) {
    errors.subject = "No debe tener más de 30 carácteres";
  }
  if (values.subject && values.subject.length < 3) {
    errors.subject = "No debe tener menos de 3 carácteres";
  }

  /* MESSAGE */
  if (!values.message) {
    errors.message = "Ingrese un mensaje";
  }

  if (values.message && values.message.length > 51) {
    errors.message = "No debe tener más de 50 carácteres";
  }

  return errors;
}
