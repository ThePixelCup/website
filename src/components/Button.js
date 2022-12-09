import React from "react"
import { faSpinner, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Button = ({className = '', onClick, isLoading, loadingText, children, alternate, isDone, doneText}) => {
  let baseClass = 'cursor-pointer text-center bg-lime-400 hover:bg-lime-500 rounded-md text-neutral-900 py-2.5 px-10';
  if (alternate) {
    baseClass = 'cursor-pointer text-center rounded-md border border-lime-400 hover:bg-lime-400 hover:text-neutral-900 text-lime-400 py-2.5 px-10';
  }
  if (isLoading) {
    return (<button disabled="disabled" className={`${baseClass} bg-lime-500 ${className}`}>
      <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> {loadingText}
    </button>);
  }
  if (isDone) {
    return (<button className={`${baseClass} ${className}`}>
      <FontAwesomeIcon icon={faCircleCheck} /> {doneText}
    </button>);
  }
  return (<button onClick={onClick} className={`${baseClass} ${className}`}>{children}</button>)
};

export default Button;