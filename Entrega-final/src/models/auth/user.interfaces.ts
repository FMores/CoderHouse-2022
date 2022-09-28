export interface IUser {
    _id?: string;
    fullName: string;
    cellPhone: number;
    email: string;
    password: string;
}

declare global {
    namespace Express {
        interface User {
            _id: string;
        }
    }
}
