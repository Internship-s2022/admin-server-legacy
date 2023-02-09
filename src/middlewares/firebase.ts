import { NextFunction, Response } from 'express';

import { CustomError } from 'src/helpers/customErrorModel';
import firebase from 'src/helpers/firebase';
import { AccessRoleType, RequestWithFirebase } from 'src/types';

const authMiddleware =
  (accessRoles: AccessRoleType[]) =>
  async (req: RequestWithFirebase, res: Response, next: NextFunction) => {
    try {
      const { token } = req.headers;
      if (!token || typeof token !== 'string') {
        throw new CustomError(400, 'Token is required');
      }
      const response = await firebase.auth().verifyIdToken(token);

      const firebaseUser = await firebase.auth().getUser(response.uid);

      const role = firebaseUser.customClaims?.role;
      const isActive = firebaseUser.customClaims?.isActive;

      if (!isActive) {
        throw new CustomError(403, 'Access removed');
      }
      if (!role) {
        throw new CustomError(403, 'No credentials found');
      }
      if (!accessRoles.includes(role)) {
        throw new CustomError(403, 'Credentials not authorized to access this information');
      }
      req.firebaseUid = response.uid;
      return next();
    } catch (error: any) {
      throw new CustomError(401, error.message);
    }
  };

export default authMiddleware;
