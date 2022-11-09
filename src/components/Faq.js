import React from "react"
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Faq = ({question, children}) => {
  return (
    <div className="mb-10">
      <h3 className="flex items-center mb-4 text-lg font-medium text-neutral-300">
        <FontAwesomeIcon icon={faCircleQuestion} /> &nbsp; {question}
      </h3>
      <p className="text-neutral-400">{children}</p>
    </div>
  )
};

export default Faq;
