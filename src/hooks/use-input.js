import { useState } from "react";

const useInput = (isSubmit,validationFun) => {
  const [value,setValue] = useState('');
  const [isTouched,setTouched] = useState(false);

  const isInvalid = validationFun(value);
  const hasError = isInvalid && (isTouched || isSubmit);

  const changeHandler = (event) => {
    setValue(event.target.value);
  }

  const blurHandler = (event) => {
    setTouched(true);
  }

  const reset = () => {
    setValue('');
    setTouched(false);
  }

  return {
    changeHandler,
    blurHandler,
    reset,
    value,
    isInvalid,
    hasError,
    touchHandler:setTouched
  }
  
}

export default useInput;