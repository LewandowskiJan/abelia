import { Role } from 'src/authorization/role.enum';

export class User {
  _id?: string;
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}
