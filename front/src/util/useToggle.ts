import { useState } from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);
  const handleValue = () => {
    setValue((prevValue) => !prevValue);
  };
  return {value, handleValue, setValue};
};

export default useToggle;
