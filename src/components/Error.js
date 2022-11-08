import React from "react"

const Error = ({message = '', onClick, hide}) => {
  const baseClass = 'w-4/5 md:max-w-3/5 md:w-auto transition ease-in-out bg-red-300 text-red-500 rounded-lg p-4 fixed left-1/2 -translate-x-1/2 z-[60]';
  if (message === '' || hide) {
    return (<div onClick={onClick} className={`${baseClass} -translate-y-48`}>
      <strong>Error:</strong> {message}
    </div>)
  }

  return (<div onClick={onClick}  className={`${baseClass} translate-y-8`}>
    <strong>Error:</strong> {message}
  </div>)
};

export default Error;
