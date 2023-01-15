import { IUserPayload } from "../interfaces";

export {};

declare global {
  namespace Express {
    interface Request {
      session: CookieSessionInterfaces.CookieSessionObject | null;
      currentUser?: IUserPayload;
    }
  }
}
