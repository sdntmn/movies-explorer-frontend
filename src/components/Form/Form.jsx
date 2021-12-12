import React from "react";
import FormLinkEnter from "../FormLinkEnter/FormLinkEnter";

export default function Form({
  title,
  btnName,
  message,
  text,
  onSubmit,
  linkText,
  name,
  children,
  pathLink,
  sylesSection,
}) {
  return (
    <div className='form'>
      <form
        className='form__data'
        id={`form_${name}`}
        name={`${name}`}
        onSubmit={onSubmit}>
        <fieldset className='form__grouping'>
          <legend className='form__title'>{title}</legend>
        </fieldset>
        {children}

        <FormLinkEnter
          sylesSection={sylesSection}
          pathLink={pathLink}
          text={text}
          linkText={linkText}
          btnName={btnName}></FormLinkEnter>
      </form>
    </div>
  );
}
