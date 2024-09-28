import { isValid } from "date-fns";
const isDate = (values: number): boolean => {
  if (!values) return false;

  if (typeof values === "string") {
    const date = new Date(values).getTime();
    const validDate = isValid(date);
    if (validDate) return true;
    else return false;
  } else {
    const validDate = isValid(values);
    if (validDate) return true;
    else return false;
  }
};

export default isDate;
