export interface IUser {
    id: number,
    name: string,
    email: string,
    username: string,
    phone: string,
    website: string,
}

export interface userState {
    users: IUser[];
    isLoading: boolean;
    error: null | string | undefined;
}