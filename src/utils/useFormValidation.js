export function FormValidation(fieldName, value) {
  if (fieldName === "name") {
    const isValidLength = value.length >= 2 && value.length <= 40;
    const nameRegex = /^[-a-zа-яёA-ZА-ЯЁ\s]+$/;
    const isValidFormat = nameRegex.test(value);

    if (!isValidLength) {
      return {
        fieldName: "Введите значение от 2 до 40 символов",
      };
    } else if (!isValidFormat) {
      return {
        fieldName:
          "Имя может содержать только кириллицу, латиницу, дефис или пробел",
      };
    } else {
      return { fieldName: "" };
    }
  }

  if (fieldName === "email") {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = emailRegex.test(value);
    return {
      fieldName: isValid ? "" : "Email некорректен",
    };
  }

  if (fieldName === "password") {
    const isValidLength = value.length >= 2 && value.length <= 15;
    if (!isValidLength) {
      return {
        fieldName: "Введите значение от 2 символов",
      };
    } else {
      return { fieldName: "" };
    }
  }
}
