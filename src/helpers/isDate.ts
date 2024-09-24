import { isValid } from "date-fns";
const isDate = (values: number): boolean => {
  if (!values) return false;

  const validDate = isValid(values);
  if (validDate) return true;
  else return false;
};

export default isDate;
