export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(o: User) {
    this.id = o.id;
    this.login = o.login;
    this.version = o.version;
    this.createdAt = o.createdAt;
    this.updatedAt = o.updatedAt;
  }
}
