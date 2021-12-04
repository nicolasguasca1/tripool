import { ROLES } from "../models/role.model";
export const checkRolesExist = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(400)
          .send({ message: `Role ${req.body.roles[i]} does not exist` });
      }
    }
  }
  next();
};
