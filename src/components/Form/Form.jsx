import React from "react"
import FormLinkEnter from "../FormLinkEnter/FormLinkEnter"

export default function Form({
  btnName,
  text,
  onSubmit,
  linkText,
  name,
  children,
  pathLink,
  onClick,
}) {
  return (
    <div className="form">
      <form
        className="form__data"
        id={`form_${name}`}
        name={`${name}`}
        onSubmit={onSubmit}
      >
        {children}
      </form>
      <FormLinkEnter
        pathLink={pathLink}
        text={text}
        linkText={linkText}
        btnName={btnName}
        onClick={onClick}
      ></FormLinkEnter>
    </div>
  )
}
