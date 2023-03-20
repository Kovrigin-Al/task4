export interface IUsers {
    id: number;
    name: string;
    email: string;
    password: string;
    last_login_time: Date;
    registration_time: Date;
    status: 'active' | 'blocked'
    createdAt?: Date;
    updatedAt?: Date;
}