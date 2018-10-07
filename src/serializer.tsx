export class UserSerializer {
    id: number;
    username: string;
    authToken: string;
    name: string;
}

export class TodoSerializer {
    id: number;
    content: string;
    user: UserSerializer;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean;
}