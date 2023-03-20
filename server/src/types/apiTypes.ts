import { IUsers } from "./databaseTypes"

export interface ICredentials {
  email: string,
  password: string,
  name?: string
}

export interface IJwt {
  id: IUsers["id"], 
  email: IUsers['email'], 
  status: IUsers['status']
}