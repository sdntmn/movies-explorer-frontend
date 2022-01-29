import { useCallback, useState } from "react";

//хук управления формой и валидации формы
export function useFormAndValidation() {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const name = input.name;
    const value = input.value;

    setIsValid(false);
    if (typeof input["name"] !== "undefined") {
      const pattern = new RegExp("[a-zA-Zа-яА-Я -]{ 1, }");
      if (!pattern.test(input["name"])) {
        setErrors(
          (errors["name"] =
            "имя содержит только латиницу, кириллицу, пробел или дефис.")
        );
      }
    }

    setInputValues({...inputValues, [name]: value });
    // input.validationMessage - текст ошибки браузера
    setErrors({...errors, [name]: input.validationMessage });
    // input.closest-имя формы
    // checkValidity() - валидна ли вся форма
    setIsValid(input.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newInputValues = {}, newErrors = {}, newIsValid = false) => {
      setInputValues(newInputValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    }, [setInputValues, setErrors, setIsValid]
  );

  return { inputValues, errors, isValid, handleChange, resetForm };
}