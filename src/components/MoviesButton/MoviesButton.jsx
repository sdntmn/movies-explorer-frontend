import React from "react"

function MoviesButton({ children, onClick, className }) {
  return (
    <>
      <button
        onClick={onClick}
        className={className}
        type="button"
        aria-label="Добавить в избранное"
      >
        {children}
      </button>
    </>
  )
}

export default MoviesButton
