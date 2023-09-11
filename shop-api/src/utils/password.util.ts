import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  static async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  static async comparePassword(password, hash): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
