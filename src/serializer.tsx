export class UserSerializer {
    public id: number;
    public username: string;
    public authToken: string;
    public name: string;
}

export class TodoSerializer {
    public id: number;
    public content: string;
    public user: UserSerializer;
    public like: number;
    public createdAt: string;
    public completedAt: string;
    public isCompleted: boolean;
}