export interface IUser {
    uid: string;
    email: string;
    name: string;
    photoUrl: string;
}

export class User {
    uid: string;
    email: string;
    name: string;
    photoUrl: string;

    constructor(user: IUser) {
        this.uid = user.uid;
        this.email = user.email;
        this.name = user.name;
        this.photoUrl = user.photoUrl;
    }
}
