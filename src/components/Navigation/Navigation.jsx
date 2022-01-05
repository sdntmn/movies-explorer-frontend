import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ pathLink, textLink, styles }) {
  return (
    <>
      <Link className={styles} to={pathLink}>
        {textLink}
      </Link>
    </>
  );
}
