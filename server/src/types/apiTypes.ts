import { IUser } from "./databaseTypes"

export interface ICredentials {
  email: string,
  password: string,
  name?: string
}

export interface IJwt {
  id: IUser["id"], 
  email: IUser['email'], 
  status: IUser['status']
}