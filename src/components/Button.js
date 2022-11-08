import React from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Button = ({className = '', onClick, isLoading, loadingText, children}) => {
  const baseClass = 'cursor-pointer bg-lime-400 hover:bg-lime-500 rounded-md text-neutral-900 py-2.5 px-10';
  if (isLoading) {
    return (<button disabled="disabled" className={`${baseClass} bg-lime-500 ${className}`}>
      <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> {loadingText}
    </button>);
  }
  return (<button onClick={onClick} className={`${baseClass} ${className}`}>{children}</button>)
};

export default Button;