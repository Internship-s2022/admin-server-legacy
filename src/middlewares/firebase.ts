import { NextFunction, Response } from 'express';

import firebase from 'src/helpers/firebase';
import { AccessRoleType, RequestWithFirebase } from 'src/types';

const authMiddleware =
  (role: AccessRoleType) => async (req: RequestWithFirebase, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ message: 'Token is required' });
    }
    try {
      const response = await firebase.auth().verifyIdToken(token);

      if (!response.role) {
        return res.status(403).json({
          message: 'No credentials found',
          data: undefined,
          error: true,
        });
      }
      if (response.role !== role) {
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
