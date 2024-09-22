import { Response, Request } from "express";
import { validationResult } from "express-validator";

const validateFields = (req: Request, res: Response, next: () => void) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      ok: false,
      errorMessage: errors.mapped(),
    });

  return next();
};

export default validateFields;
