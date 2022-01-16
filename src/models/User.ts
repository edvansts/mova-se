import { removeUndefinedFromObj } from '../helpers/FnUtils';

export interface IUser {
    uid: string;
    email: string;
    name: string;
    photoUrl: string;
    id?: string;
    createdTime?: string;
    updateTime?: string;
}

export class User {
    id: string;
    uid: string;
    email: string;
    name: string;
    photoUrl: string;
    createdTime: string;
    updateTime: string;

    constructor(user: IUser) {
        this.id = user.id;
        this.uid = user.uid;
        this.email = user.email;
        this.name = user.name;
        this.photoUrl = user.photoUrl;
        this.createdTime = user.createdTime;
        this.updateTime = user.updateTime;
    }

    toObj() {
        const obj: IUser = {
            id: this.id,
            uid: this.uid,
            email: this.email,
            name: this.name,
            photoUrl: this.photoUrl,
            createdTime: this.createdTime,
            updateTime: this.updateTime,
        };

        return removeUndefinedFromObj(obj);
    }

    static toFirestore(data: User): FirebaseFirestore.DocumentData {
        return data.toObj();
    }

    static fromFirestore(
        snapshot: FirebaseFirestore.QueryDocumentSnapshot,
    ): User {
        const data = snapshot.data();
        return new User({
            name: data.name,
            id: snapshot.id,
            email: data.email,
            uid: data.uid,
            photoUrl: data.photoUrl,
            createdTime: snapshot.createTime.toDate().toISOString(),
            updateTime: snapshot.updateTime.toDate().toISOString(),
        });
    }

    static getConverter() {
        return {
            toFirestore: this.toFirestore,
            fromFirestore: this.fromFirestore,
        };
    }
}
