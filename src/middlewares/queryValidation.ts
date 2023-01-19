import { NextFunction, Request, Response } from 'express';

import { entitiesSchemaKeys } from 'src/constants';
import { CustomError } from 'src/helpers/customErrorModel';

const queryParamsOnSchemaValidation =
  (entityType: 'client' | 'employee' | 'member' | 'project' | 'user') =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const queryParams = Object.keys(req.query);

    if (!queryParams.length) {
      return next();
    }

    const invalidParams = queryParams.find(
      (queryParam) => !entitiesSchemaKeys[entityType].includes(queryParam),
    );

    if (invalidParams) {
      throw new CustomError(
        400,
        `The property '${invalidParams}' does not exist as a filter param`,
      );
    }

    next();
  };

export default queryParamsOnSchemaValidation;
