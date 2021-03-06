import { useCallback, useState } from "react";

export function useFormAndValidation() {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const pattern = (str) => /^[a-zA-Zа-яА-Я -]+$/i.test(str);
    const patternEmail = (str) =>
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.*[a-z]{2,}$/i.test(
        str
      );
    const input = evt.target;
    const name = input.name;
    const value = input.value;

    if (typeof input["name"] !== "undefined" && name === "name") {
      pattern(value);
      if (!pattern(value)) {
        setErrors(
          input.setCustomValidity(
            "имя содержит только латиницу, кириллицу, пробел или дефис."
          )
        );
      } else {
        setErrors(input.setCustomValidity(""));
        setIsValid(false);
      }
    }

    if (typeof input["name"] !== "undefined" && name === "email") {
      patternEmail(value);
      if (!patternEmail(value)) {
        setErrors(input.setCustomValidity("Не корректный email"));
      } else {
        setErrors(input.setCustomValidity(""));
        setIsValid(false);
      }
    }

    setInputValues({...inputValues, [name]: value });
    setErrors({...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newInputValues = {}, newErrors = {}, newIsValid = false) => {
      setInputValues(newInputValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    }, [setInputValues, setErrors, setIsValid]
  );

  return {
    inputValues,
    errors,
    isValid,
    handleChange,
    resetForm,
    setIsValid,
    setInputValues,
  };
}