import React from "react";
import FormLinkEnter from "../FormLinkEnter/FormLinkEnter";

export default function Form({
  title,
  btnName,
  onSubmit,
  name,
  text,
  linkText,
  pathLink,
  isDisabled,
  children,
  isEditState,
  errorsMessage,
  message,
  errorsEdit,
  isAddValidity,
}) {
  return (
    <div className={isEditState ? "form__edit" : "form"}>
      <form
        className={isEditState ? "form__data-edit" : "form__data"}
        name={name}
        onSubmit={onSubmit}
      >
        <fieldset
          className={isEditState ? "form__grouping-edit" : "form__grouping"}
        >
          <legend className={isEditState ? "form__title-edit" : "form__title"}>
            {title}
          </legend>
          {children}
        </fieldset>
      </form>
      <FormLinkEnter
        isEditState={isEditState}
        pathLink={pathLink}
        text={text}
        linkText={linkText}
        btnName={btnName}
        onSubmit={onSubmit}
        isDisabled={isDisabled}
        errorsMessage={errorsMessage}
        errorsEdit={errorsEdit}
        message={message}
        isAddValidity={isAddValidity}
      />
    </div>
  );
}
