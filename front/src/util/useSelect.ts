import { useState } from "react";

const useSelect = (initialState: string) => {
  const [value, setValue] = useState(initialState);
  const onChange = (selectValue: string) => {
    setValue(selectValue);
  };
  return { value, onChange };
};
export default useSelect;
