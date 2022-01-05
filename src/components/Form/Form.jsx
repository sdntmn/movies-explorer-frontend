import React from "react";
import FormLinkEnter from "../FormLinkEnter/FormLinkEnter";

export default function Form({
  btnName,
  text,
  onSubmit,
  linkText,
  name,
  children,
  pathLink,
  onClick,
  title,
  isEditState,
}) {
  return (
    <div className={isEditState ? "form__edit" : "form"}>
      <form
        className={isEditState ? "form__data-edit" : "form__data"}
        id={`form_${name}`}
        name={`${name}`}
        onSubmit={onSubmit}
      >
        <fieldset className={isEditState ? "form__grouping-edit" : "form__grouping"}>
          <legend className={isEditState ? "form__title-edit" : "form__title"}>{title}</legend>
          {children}
        </fieldset>
      </form>
      <FormLinkEnter
        isEditState={isEditState}
        pathLink={pathLink}
        text={text}
        linkText={linkText}
        btnName={btnName}
        onClick={onClick}
      />
    </div>
  );
}
