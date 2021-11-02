import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces';
import { User } from '../core/models';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}
  async createUser(_user: UserDto): Promise<IUser> {
    return await this.userRepository.create(_user);
  }

  async findAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async findUserById(id: string): Promise<IUser> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<IUser> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async deleteUserById(id: string): Promise<number> {
    return await this.userRepository.destroy({
      where: {
        id,
      },
    });
  }

  async updateUserById(id: string, _user: UserDto): Promise<IUser> {
    const [, [updUser]] = await this.userRepository.update(_user, {
      where: { id },
      returning: true,
    });
    return updUser;
  }
}
