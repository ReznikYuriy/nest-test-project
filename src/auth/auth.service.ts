import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/user/interfaces';
import { UserService } from '../user/user.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async validateUser(user_email: string, pass: string): Promise<IUser> {
    // find if user exist with this email
    const user = await this.userService.findUserByEmail(user_email);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.createUser({
      ...user,
      password: pass,
    });

    const { ...result } = newUser['dataValues'];
    // this.logger.log(result);

    const token = await this.generateToken(result);
    // return the user and the token
    return { user: result, token };
  }

  private async generateToken(user): Promise<string> {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
