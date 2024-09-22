import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED!,
      { expiresIn: "4h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Error generating the token");
        }
        resolve(token);
      }
    );
  });
};

export { generateJWT };
