export class UserService {
  createUser(name: string, email: string) {
    return {
      id: 1,
      name,
      email,
    };
  }
}