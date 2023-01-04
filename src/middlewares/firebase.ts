import { NextFunction, Response } from 'express';

import firebase from 'src/helpers/firebase';
import { AccessRoleType, RequestWithFirebase } from 'src/types';

const authMiddleware =
  (accessRole: AccessRoleType) =>
  async (req: RequestWithFirebase, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ message: 'Token is required' });
    }
    try {
      const response = await firebase.auth().verifyIdToken(token);

      const firebaseUser = await firebase.auth().getUser(response.uid);

      const role = firebaseUser.customClaims?.role;
      const isActive = firebaseUser.customClaims?.isActive;

      if (!isActive) {
        return res.status(403).json({
          message: 'Access removed',
          data: undefined,
          error: true,
        });
      }
      if (!role) {
        return res.status(403).json({
          message: 'No credentials found',
          data: undefined,
          error: true,
        });
      }
      if (role !== accessRole) {
        return res.status(403).json({
          message: 'Credentials not authorized to access this information',
          data: undefined,
          error: true,
        });
      }
      req.firebaseUid = response.uid;
      return next();
    } catch (error: any) {
      return res.status(401).json({
        message: error.message,
        data: undefined,
        error: true,
      });
    }
  };

export default authMiddleware;
