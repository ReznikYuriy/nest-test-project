import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAllUsers();
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<IUser> {
    return await this.userService.findUserById(id);
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<IUser> {
    return await this.userService.createUser(userDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<IUser> {
    return await this.userService.updateUserById(id, userDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return await this.userService.deleteUserById(id);
  }
}
