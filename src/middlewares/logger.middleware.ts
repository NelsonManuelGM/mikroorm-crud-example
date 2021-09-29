import { NextFunction, Request, Response } from "express";

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.group("REQUEST INFO...");
  console.log(`${req.method} ${req.path}`);
  console.groupEnd();
  next();
}
