import * as Hapi from "@hapi/hapi";

export interface ICredentials extends Hapi.AuthCredentials {
  id: string;
  user: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
  credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
  auth: IRequestAuth;
}

export interface ILoginRequest extends Hapi.Request {
  auth: IRequestAuth;
  payload: {
    user: string;
    password: string;
  };
}

export interface IPasswordResetRequest extends Hapi.Request {
  auth: IRequestAuth;
  payload: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface IRegisterRequest extends Hapi.Request {
  auth: IRequestAuth;
  payload: {
    username?: string;
    email?: string;
    password: string;
  };
}
