import { NextFunction, Request, Response } from 'express';

import { entitiesSchemaKeys } from 'src/constants';

const queryParamsOnSchemaValidation =
  (entityType: 'client' | 'employee' | 'member' | 'project' | 'user') =>
  async (req: Request, res: Response, next: NextFunction) => {
    const queryParams = Object.keys(req.query);

    if (!queryParams.length) {
      return next();
    }

    const invalidParams = queryParams.find(
      (queryParam) => !entitiesSchemaKeys[entityType].includes(queryParam),
    );

    if (invalidParams) {
      return res.status(400).json({
        message: `The property '${invalidParams}' does not exist as a filter param`,
        error: true,
      });
    }

    next();
  };

export default queryParamsOnSchemaValidation;
