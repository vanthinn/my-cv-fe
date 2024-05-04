export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string
    gender?: string;
    dateOfBirth?: string;
    address?: string;
}