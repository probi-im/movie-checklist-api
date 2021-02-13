import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const AUTH_SECRET = process.env.AUTH_SECRET || 'this is not a secret';

export default (request: Request, response: Response, next: NextFunction) => {
  if (!request.headers.authorization) {
    return response.status(403).json({
      message: "You can't access this route, sorry",
    });
  }
  const token = request.headers.authorization.split(' ')[1];
  jwt.verify(token, AUTH_SECRET, (err: any, decodedToken: any) => {
    if (err) {
      return response.status(401).json({
        message: "Token couldn't be verified or has expired",
      });
    }
    const userId = decodedToken.userId;
    if (request.headers.userid && request.headers.userid !== userId) {
      return response.status(401).json({
        message: 'There is an error with your token',
      });
    }
     else {
       request.headers.userid = userId;
     }
    next();
  });
};
